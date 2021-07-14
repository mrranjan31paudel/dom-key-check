"use strict";

(function () {
  const keyLocations = [
    'Standard',
    'Left',
    'Right',
    'Numpad'
  ];
  const keyLabelMap = {
    key: 'Key',
    code: 'Code',
    keyCode: 'Key code',
    charCode: 'Character code',
    altKey: 'Alt key pressed?',
    ctrlKey: 'Ctrl key pressed?',
    shiftKey: 'Shift key pressed?',
    metaKey: 'Meta key pressed?',
    repeat: 'Is key held down?',
    location: 'Key location'
  };
  const _keys = Object.keys(keyLabelMap);
  let currentEventType = 'keydown';
  let cardsContainerElem = document.getElementById('cards-container');
  let eventSelectorElem = document.getElementById('event-selector');
  let keypressWarningElem = document.getElementById('keypress-warning');

  function createElements() {
    _keys.forEach(_key => {
      let newFieldSet = document.createElement('fieldset');
      let newLegend = document.createElement('legend');
      let newLabel = document.createElement('label');
      let newSpan = document.createElement('span');

      newSpan.innerText = 'Press a key';
      newSpan.style.color = 'grey';
      newLegend.innerText = keyLabelMap[_key];
      newLegend.style.fontWeight = 600;
      newLabel.id = _key;
      newLabel.appendChild(newSpan);
      newFieldSet.appendChild(newLegend);
      newFieldSet.appendChild(newLabel);
      cardsContainerElem.appendChild(newFieldSet);
    });
  }

  function updateData(ev) {
    _keys.forEach(_key => {
      let elem = document.getElementById(_key);

      if (ev[_key] === false)
        return elem.innerHTML = 'No';

      if (ev[_key] === true)
        return elem.innerHTML = 'Yes';

      if (_key === 'location')
        return elem.innerHTML = keyLocations[parseInt(ev.location)];

      if (ev[_key] === null || ev[_key] === undefined)
        return elem.innerHTML = '-';

      elem.innerHTML = ev[_key];
    });
  }

  function handleKeyDown(ev) {
    ev.preventDefault();

    if (currentEventType === 'keydown')
      updateData(ev);
  }

  function handleKeyPress(ev) {
    ev.preventDefault();

    if (currentEventType === 'keypress') {
      if (ev.type === 'keyup') {
        let repeatElem = document.getElementById('repeat');

        return repeatElem.innerHTML = 'No';
      }

      updateData(ev);
    }
  }

  function handleKeyUp(ev) {
    ev.preventDefault();

    let repeatElem = document.getElementById('repeat');

    repeatElem.innerHTML = 'No';
  }

  function changeEventType(ev) {
    currentEventType = `${ev.target.value}`;

    if (currentEventType === 'keypress') {
      keypressWarningElem.toggleAttribute('hidden');

      document.body.removeEventListener('keydown', handleKeyDown);
      document.body.addEventListener('keypress', handleKeyPress);

      return;
    }

    if (currentEventType === 'keydown') {
      keypressWarningElem.toggleAttribute('hidden');

      document.body.removeEventListener('keypress', handleKeyPress);
      document.body.addEventListener('keydown', handleKeyDown);
    }
  }

  eventSelectorElem.addEventListener('change', changeEventType);
  document.body.addEventListener('keydown', handleKeyDown);
  document.body.addEventListener('keyup', handleKeyUp);

  createElements();
})();
