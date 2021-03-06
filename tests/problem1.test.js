/**
 * Napisz funkcję 'negation', która przyjmuje Promise'a jako argument i zwraca Promise'a, który
 * jest jego negacją, tzn. rozwiązuje się poprawnie, gdy Promise wejściowy kończy się
 * niepowodzeniem a kończy się niepowodzeniem, gdy Promise wejściowy zwraca poprawną wartość.
 *
 * Przykładowo Promise zwracany przez
 *
 * negation(Promise.resolveWith(5).after(50));
 *
 * powinien rzucać liczbę 5 jako obiekt błędu, zaś
 *
 * negation(Promise.rejectWith(5).after(50));
 *
 * powinien poprawnie zwracać liczbę 5 jako wartość.
 *
 */

const p = require('../utils.js');

function negation(myPromise){
  return new Promise(function(resolve, reject) {
      myPromise.then(function(result) {
        reject(result);
      });
      myPromise.catch(function(result) {
        resolve(result);
      });
  });
}

describe('problem1', () => {
    it('negates resolved promises', (done) => {
        negation(p.resolveWith(1).after(10))
            .catch(err => {
                expect(err).toEqual(1);
                done();
            })
    });

    it('negates rejected promises', (done) => {
        negation(p.rejectWith(1).after(10))
            .then(err => {
                expect(err).toEqual(1);
                done();
            });
    });
});
