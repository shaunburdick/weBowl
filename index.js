var weBowl = {}

weBowl.PINS_PER_FRAME = 10;
weBowl.BOWLS_FOR_SPARE = 2;
weBowl.BOWLS_FOR_STRIKE = 1;

/**
 * Score game
 * @param {Object[]} frames an array of frames
 * [
 *   {
 *     bowls: [],
 *     frame: 1
 *   }
 * ]
 * @return {integer} total score
 */
weBowl.scoreGame = function(frames) {
  var isSpare = false;
  var strikeCount = 0;
  return frames.reduce(function(prev, frame) {
    if (isSpare) {
      prev += frame.bowls[0];
    }

    if (strikeCount > 2) {
      prev += frame.bowls[0];
      strikeCount--;
    }

    if (strikeCount > 0) {
      var bowlCount = 0;
      while (strikeCount > 0 && bowlCount < frame.bowls.length) {
        prev += frame.bowls[bowlCount];
        bowlCount++;
        strikeCount--;
      }
    }

    isSpare = weBowl.isSpare(frame.bowls);
    strikeCount += weBowl.isStrike(frame.bowls) ? 2 : 0;

    return prev + weBowl.sumFrame(frame.bowls);
  }, 0);
};

/**
 * Sum frames
 * @param {integer[]} bowls A frame of bowls, ex [1,5]
 * @return {integer} total score for frame
 */
weBowl.sumFrame = function(bowls) {
  return bowls.reduce(function(total, bowl) {
    return total + bowl;
  }, 0);
};

/**
 * Check if frame is a spare
 *
 * @param {integer[]} bowls A frame of bowls, ex [1,5]
 * @return {boolean} True if spare
 */
weBowl.isSpare = function(bowls) {
  return (
    bowls.length === weBowl.BOWLS_FOR_SPARE
    && weBowl.sumFrame(bowls) === weBowl.PINS_PER_FRAME
  );
}

/**
 * Check if frame is a strike
 *
 * @param {integer[]} bowls A frame of bowls, ex [1,5]
 * @return {boolean} True if strike
 */
weBowl.isStrike = function(bowls) {
  return (
    bowls.length === weBowl.BOWLS_FOR_STRIKE
    && weBowl.sumFrame(bowls) === weBowl.PINS_PER_FRAME
  );
}
