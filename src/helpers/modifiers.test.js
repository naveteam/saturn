import getModifiers from './modifiers'

it('Modifiers should not contain undefined', () => {
  const modifiers = getModifiers()

  expect(modifiers).toEqual(expect.not.stringContaining('undefined'))
})
