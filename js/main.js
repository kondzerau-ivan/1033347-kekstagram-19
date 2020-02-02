'use strict';

var randomRange = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

var generatePicDescription = function () {
  var arrPicDesc = [];
  for (var i = 1; i <= 25; i++) {
    arrPicDesc.push({
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: randomRange(15, 200),
      comments: [].push({
        avatar: 'img/avatar-' + randomRange(1, 6) + '.svg',
        message: [
          'Всё отлично!',
          'В целом всё неплохо. Но не всё.',
          'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
          'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
          'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
          'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
        ][randomRange(0, 5)],
        name: [
          'Валера',
          'Толик',
          'Галя',
          'Зина',
          'Иннокентий'
        ][randomRange(0, 4)]
      })
    });
  }
  return arrPicDesc;
};

var picTemplate = document.querySelector('#picture');
var picElement = document.querySelector('.picture');

for (var j = 0; j < 25; j++) {
  var currentPicElement = picTemplate.cloneNode(true);
  currentPicElement.querySelector('.picture_img').src = generatePicDescription()[j]['url'];
  currentPicElement.querySelector('.picture__likes').textContent = generatePicDescription()[j]['likes'];
  currentPicElement.querySelector('.picture__comments').textContent = generatePicDescription()[j]['comments'];
  picElement.appendChild(currentPicElement);
}
