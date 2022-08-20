import { getSeasonsToRetrieve } from './seasonUtils';

describe('getSeasonsToRetrieve', () => {
  test('getSeasonsToRetrieve counts all seasons including edge points', () => {
    const startingSeason = '1';
    const endingSeason = '2';

    const seasonToLeagueIdKVP = {
      1: 'season 1',
      2: 'season 2',
    };

    const result = getSeasonsToRetrieve(
      startingSeason,
      endingSeason,
      seasonToLeagueIdKVP,
    );
    expect(result).toEqual([
      seasonToLeagueIdKVP[1],
      seasonToLeagueIdKVP[2],
    ]);
  });

  test('getSeasonsToRetrieve errors expectedly when ending season exceeds supports seasons', () => {
    const startingSeason = '1';
    const endingSeason = '3';

    const seasonToLeagueIdKVP = {
      1: 'season 1',
      2: 'season 2',
    };

    expect(() =>
      getSeasonsToRetrieve(
        startingSeason,
        endingSeason,
        seasonToLeagueIdKVP,
      ),
    ).toThrow(
      `Season: '3' is not supported. Supported seasons are: 1,2`,
    );
  });
});
