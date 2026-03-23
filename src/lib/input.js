export function isTypingTarget(target) {
  if (!target || typeof target !== 'object') return false;
  if (target.isContentEditable) return true;

  const tagName = typeof target.tagName === 'string'
    ? target.tagName.toUpperCase()
    : '';

  return tagName === 'INPUT'
    || tagName === 'TEXTAREA'
    || tagName === 'SELECT'
    || tagName === 'BUTTON';
}
