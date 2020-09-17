const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};

function withBoxUnlocked(body) {
  // Check the initial state of the box
  let lock_state = box.locked;
  // Unlock the box if locked
  if (lock_state) {
    box.unlock();
    // Run the function
    try {
      body();
    } finally {
      //Lock the box
      box.lock();
    }
  } else {
    // Otherwise the box is unlocked and we can just run the function
    body();
  }
}

withBoxUnlocked(function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function () {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true
