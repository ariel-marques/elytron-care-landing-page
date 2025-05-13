const commentsContainer = document.querySelector('#hero-comments .space-y-3');

function getRandomLikes() {
  return Math.floor(Math.random() * (70 - 5 + 1)) + 5;
}

function getRandomAvatar(gender, ageGroup) {
  let folder = '';
  let maxImages = 1;

  if (gender === 'male' && ageGroup === 'older') {
    folder = 'older-men';
    maxImages = 6;
  } else if (gender === 'female' && ageGroup === 'older') {
    folder = 'older-women';
    maxImages = 7;
  } else if (gender === 'male' && ageGroup === 'young') {
    folder = 'young-men';
    maxImages = 13;
  } else if (gender === 'female' && ageGroup === 'young') {
    folder = 'young-women';
    maxImages = 31;
  }

  const randomNumber = Math.floor(Math.random() * maxImages) + 1;
  return `assets/img/people/${folder}/${randomNumber}.jpg`;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCommentElement(commentObj) {
  const likes = getRandomLikes();
  const avatar = getRandomAvatar(commentObj.gender, commentObj.ageGroup);

  return `
    <div class="flex gap-2">
      <img src="${avatar}" alt="${commentObj.name}" class="w-8 h-8 rounded-full object-cover">
      <div class="flex-1">
        <div class="bg-gray-100 rounded-2xl px-3 py-2">
          <h3 class="text-[13px] font-semibold text-[#050505] text-left">${commentObj.name}</h3>
          <p class="text-[13px] text-[#050505] text-left">${commentObj.comment}</p>
        </div>
        <div class="flex items-center gap-3 mt-0.5 text-xs">
          <button class="font-semibold text-[#65676B] hover:text-[#0866FF]">Like</button>
          <button class="font-semibold text-[#65676B] hover:text-[#0866FF]">Reply</button>
          <span class="text-[#65676B]">1h</span>
          <div class="flex items-center gap-1">
            <div class="bg-[#0866FF] p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up w-2.5 h-2.5 text-white">
                <path d="M7 10v12"></path>
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
              </svg>
            </div>
            <span class="text-[#65676B]">${likes}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Embaralhar os comentários
const shuffledComments = shuffleArray(commentsData).slice(0, 40);

// Renderizar todos de uma vez
shuffledComments.forEach(comment => {
  commentsContainer.insertAdjacentHTML('beforeend', createCommentElement(comment));
});