var assert = chai.assert;

describe( 'weBowl tests', function() {

  it( 'should return zero for no frames', function() {
    var result = weBowl.scoreGame([]);
    assert.equal( result, 0 );
  } );

  it( 'should sum simple pin count', function() {
    var result = weBowl.scoreGame([
      { bowls: [1], frame: 1},
      { bowls: [2], frame: 2},
      { bowls: [3], frame: 3},
      { bowls: [4], frame: 4},
    ]);
    assert.equal( result, 10 );
  } );

  it( 'should sum multple bowls per frame', function() {
    var result = weBowl.scoreGame([
      { bowls: [1,2], frame: 1}
    ]);
    assert.equal( result, 3 );
  } );

  it( 'should sum complex pin count', function() {
    var result = weBowl.scoreGame([
      { bowls: [1], frame: 1},
      { bowls: [2,6], frame: 2},
      { bowls: [3,2], frame: 3},
      { bowls: [4,2], frame: 4},
    ]);
    assert.equal( result, 20 );
  } );

  it( 'should sum three bowls per frame', function() {
    var result = weBowl.scoreGame([
      { bowls: [1, 2, 3], frame: 1}
    ]);
    assert.equal( result, 6 );
  } );

  it( 'should handle spares', function() {
    var result = weBowl.scoreGame([
      { bowls: [9, 1], frame: 1},
      { bowls: [1, 2], frame: 2}
    ]);
    assert.equal( result, 14 );
  } );

  it( 'should handle multiple spares', function() {
    var result = weBowl.scoreGame([
      { bowls: [9, 1], frame: 1},
      { bowls: [1, 9], frame: 2},
      { bowls: [3, 3], frame: 3}
    ]);
    assert.equal( result, 30 );
  } );

  it( 'should handle strikes', function() {
    var result = weBowl.scoreGame([
      { bowls: [10], frame: 1},
      { bowls: [3, 5], frame: 2}
    ]);
    assert.equal( result, 26 );
  } );

  it( 'should handle multiple strikes', function() {
    var result = weBowl.scoreGame([
      { bowls: [10], frame: 1}, // 23
      { bowls: [10], frame: 2}, // + 18 = 41
      { bowls: [3, 5], frame: 3} // + 8 = 49
    ]);
    assert.equal( result, 49 );
  } );

  it( 'should handle perfect game', function() {
    var result = weBowl.scoreGame([
      { bowls: [10], frame: 1}, // 30
      { bowls: [10], frame: 2}, // + 21 = 51
      { bowls: [10], frame: 3}, // + 13 = 64
      { bowls: [1, 2], frame: 4}, // + 3 = 67
    ]);
    assert.equal( result, 67 );
  } );

  it( 'should handle perfect game', function() {
    var result = weBowl.scoreGame([
      { bowls: [10], frame: 1},
      { bowls: [10], frame: 2},
      { bowls: [10], frame: 3},
      { bowls: [10], frame: 4},
      { bowls: [10], frame: 5},
      { bowls: [10], frame: 6},
      { bowls: [10], frame: 7},
      { bowls: [10], frame: 8},
      { bowls: [10], frame: 9},
      { bowls: [10, 10, 10], frame: 10},
    ]);
    assert.equal( result, 300 );
  } );

  it( 'should handle final game', function() {
    var result = weBowl.scoreGame([
      { bowls: [10], frame: 1},
      { bowls: [9, 1], frame: 2},
      { bowls: [5, 5], frame: 3},
      { bowls: [7, 2], frame: 4},
      { bowls: [10], frame: 5},
      { bowls: [10], frame: 6},
      { bowls: [10], frame: 7},
      { bowls: [9, 0], frame: 8},
      { bowls: [8, 2], frame: 9},
      { bowls: [9, 1, 10], frame: 10},
    ]);
    assert.equal( result, 187 );
  } );

} );
