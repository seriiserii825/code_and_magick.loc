/* global docCookies: true */
'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var form = document.querySelector('.review-form');
  var formSubmit = document.querySelector('.review-submit');
  formSubmit.setAttribute('disabled', 'disabled');
  var fields = document.querySelector('.review-fields');
  var fieldName = document.querySelector('#review-name');
  var fieldText = document.querySelector('#review-text');
  var fieldLabelName = document.querySelector('.review-fields label[for=\"review-name\"]');
  var fieldLabel = document.querySelector('.review-fields label[for=\"review-text\"]');
  var formMark = form.elements.namedItem('review-mark');

  if (docCookies) {
    if (docCookies.hasItem('name')) {
      fieldName.value = docCookies.getItem('name');
      fieldLabelName.classList.add('invisible');
    }
    if (docCookies.hasItem('mark')) {
      formMark.value = docCookies.getItem('mark');
      if ((docCookies.getItem('mark') > 2) && docCookies.hasItem('name')) {
        formSubmit.disabled = false;
      }
    }
  }

  if (formMark.value > 2) {
    fieldLabel.classList.add('invisible');
  }

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  form.addEventListener('change', function() {
    if (formMark.value < 3) {
      fieldLabel.classList.remove('invisible');
      var isValidName = validateField(fieldName);
      var isValidText = validateField(fieldText);
      if (isValidName && isValidText) {
        formSubmit.disabled = false;
        fields.classList.add('invisible');
      } else {
        formSubmit.disabled = true;
        fields.classList.remove('invisible');
      }
    } else {
      fieldLabel.classList.add('invisible');
      if (validateField(fieldName)) {
        formSubmit.disabled = false;
        fields.classList.add('invisible');
      } else {
        formSubmit.disabled = true;
        fields.classList.remove('invisible');
      }
    }
  });

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    var today = new Date();
    var lastBirthday = '8 April ' + today.getFullYear() + ' GMT+0300';
    var lastBirthdayDate = new Date(lastBirthday);
    var betweenDates = today - lastBirthdayDate;

    if (betweenDates < 0) {
      lastBirthday = '8 April ' + (today.getFullYear() - 1) + ' GMT+0300';
      lastBirthdayDate = new Date(lastBirthday);
      betweenDates = today - lastBirthdayDate;
    }

    var dieDay = today.valueOf() + betweenDates;
    var betweenDatesFormatted = new Date(dieDay).toUTCString();

    console.log(betweenDatesFormatted);

    document.cookie = 'mark=' + formMark.value + ';expires=' + betweenDatesFormatted;
    document.cookie = 'name=' + fieldName.value + ';expires=' + betweenDatesFormatted;

    form.submit();
  });

  /**
   * Функция которая проверяет поле на заполненность
   * @param {Element} field
   * @return {boolean}
   */
  function validateField(field) {
    var fieldValue = field.value;
    var fieldId = field.id;
    var fieldLabelCurrent = document.querySelector('.review-fields label[for=\"' + fieldId + '\"]');
    if (fieldValue === '') {
      fieldLabelCurrent.classList.remove('invisible');
      return false;
    } else {
      fieldLabelCurrent.classList.add('invisible');
      return true;
    }
  }
})();
