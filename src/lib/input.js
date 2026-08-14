function getTagName(target) {
  return target && typeof target.tagName === 'string'
    ? target.tagName.toUpperCase()
    : '';
}

export function isTypingTarget(target) {
  if (!target || typeof target !== 'object') return false;
  if (target.isContentEditable) return true;

  const tagName = getTagName(target);
  return tagName === 'INPUT'
    || tagName === 'TEXTAREA'
    || tagName === 'SELECT';
}

export function isButtonActivationTarget(target, key) {
  if (getTagName(target) !== 'BUTTON') return false;
  return key === 'Enter' || key === ' ' || key === 'Spacebar';
}
