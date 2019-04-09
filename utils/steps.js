function steps(items) {
  async function execStep(index) {
    if (index >= items.length) {
      return null;
    }
    const step = items[index];
    console.log(`step ${index + 1}: ${step.title}`);
    try {
      await step.action();
    } catch (e) {
      console.error(e);
    }

    return execStep(index + 1);
  }

  return execStep(0);
}

module.exports = steps;
