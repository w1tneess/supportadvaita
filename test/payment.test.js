import test from 'node:test'
import assert from 'node:assert/strict'
import { PAYMENT_CONFIG, parseAmount, sanitizeNote } from '../src/config/payment.js'

// The sanitizer this replaced, kept only to prove ASCII behaviour did not change.
const legacySanitize = (note) => note.replace(/[^\w\s.,!?-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 50)

const query = (note, opts) => PAYMENT_CONFIG.buildUpiQuery(150, note, opts)
const tnOf = (q) => q.split('&').find((pair) => pair.startsWith('tn=')).slice(3)

test('sanitizeNote: keeps Bengali letters, vowel signs and the virama', () => {
  assert.equal(sanitizeNote('আমি আদ্বৈত'), 'আমি আদ্বৈত')
  assert.equal(sanitizeNote('ধন্যবাদ!'), 'ধন্যবাদ!')
  assert.equal(sanitizeNote('নমস্কার ১২৩'), 'নমস্কার ১২৩')
  assert.equal(sanitizeNote('রাহুল (বাংলা)'), 'রাহুল বাংলা')
})

test('sanitizeNote: ASCII behaviour is unchanged', () => {
  for (const input of ['Chai for you!', 'Hello,   World? 123_x', 'a&b=c#d%e;f', 'it\'s "quoted" <b>', '  padded  ', '', '🙏']) {
    assert.equal(sanitizeNote(input), legacySanitize(input), JSON.stringify(input))
  }
})

test('sanitizeNote: drops characters that could pollute the query string', () => {
  const dirty = sanitizeNote('x&am=99999&pa=evil@upi#frag%20;y')
  assert.doesNotMatch(dirty, /[&=#%;@]/)
  assert.equal(dirty, 'xam99999paevilupifrag20y')
})

test('sanitizeNote: drops emoji, keeps the surrounding text', () => {
  assert.equal(sanitizeNote('thanks 🙏 ধন্যবাদ'), 'thanks ধন্যবাদ')
})

test('sanitizeNote: normalizes equivalent Bengali sequences to NFC', () => {
  assert.equal(sanitizeNote('কো'), 'কো')
})

test('sanitizeNote: limit is 50 code points and never splits a surrogate pair', () => {
  assert.equal([...sanitizeNote('ক'.repeat(80))].length, 50)
  // 'a' + 30 astral letters: a cut at UTF-16 index 50 would land inside a pair
  const astral = sanitizeNote('a' + '𝐀'.repeat(30))
  assert.equal([...astral].length, 31)
  const longAstral = sanitizeNote('a'.repeat(1) + '𝐀'.repeat(60))
  assert.equal([...longAstral].length, 50)
  assert.doesNotThrow(() => encodeURIComponent(longAstral), 'a lone surrogate would throw URIError')
})

test('sanitizeNote: non-strings become empty', () => {
  for (const input of [undefined, null, 42, {}, []]) assert.equal(sanitizeNote(input), '')
})

test('buildUpiQuery: Bengali note is percent-encoded as UTF-8 and round-trips', () => {
  const q = query('ধন্যবাদ')
  assert.equal(tnOf(q), '%E0%A6%A7%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%AC%E0%A6%BE%E0%A6%A6')
  assert.equal(new URL(`upi://pay?${q}`).searchParams.get('tn'), 'ধন্যবাদ')
})

test('buildUpiUri: exact shape, literal @ in the VPA, %20 for spaces and never +', () => {
  assert.equal(
    PAYMENT_CONFIG.buildUpiUri(150, 'Hi there'),
    'upi://pay?pa=advaita@fam&pn=Advaita%20Chandra&cu=INR&am=150.00&tn=Hi%20there',
  )
  assert.doesNotMatch(query('a b c'), /\+/)
})

test('buildUpiQuery: withAmount false omits am; invalid amounts never produce one', () => {
  assert.doesNotMatch(query('x', { withAmount: false }), /(^|&)am=/)
  for (const bad of ['150abc', 0, -5, 1.5, 100001, null]) {
    assert.doesNotMatch(PAYMENT_CONFIG.buildUpiQuery(bad, 'x'), /(^|&)am=/, String(bad))
  }
})

test('buildUpiQuery: a hostile note cannot add or override parameters', () => {
  const pairs = query('x&pa=evil@upi&am=1&tn=hijack').split('&')
  assert.deepEqual(pairs.map((p) => p.split('=')[0]), ['pa', 'pn', 'cu', 'am', 'tn'])
  assert.equal(pairs[0], 'pa=advaita@fam')
})

test('buildUpiQuery: falls back to the default note when nothing survives', () => {
  for (const note of ['🙏🙏', '', '   ', undefined]) {
    assert.equal(tnOf(query(note)), 'Support%20Advaita%20Chandra', JSON.stringify(note))
  }
})

test('parseAmount: whole rupees from 1 to 100000 only', () => {
  assert.equal(parseAmount('150'), 150)
  assert.equal(parseAmount('100000'), 100000)
  for (const bad of ['150abc', '01', '1.5', ' 150', '-5', '0', '100001', '', 1.5, NaN]) {
    assert.equal(parseAmount(bad), null, String(bad))
  }
})
