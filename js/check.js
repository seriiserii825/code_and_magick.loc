'ues strict';

function getMessage(a, b) {

  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  }

  if (typeof a === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }

  if (Array.isArray(a)) {
    var sum = 0, i = 0;

    if (Array.isArray(b)) {
      for (i = 0; i < a.length; i++) {
        sum = sum + (a[i] * b[i]);
      }
      return 'Я прошёл ' + sum + ' метров';
    }

    for (i = 0; i < a.length; i++) {
      sum = sum + a[i];
    }
    return 'Я прошёл ' + sum + ' шагов';
  }
}
