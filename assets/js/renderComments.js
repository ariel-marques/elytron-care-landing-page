const commentsContainer = document.querySelector('#hero-comments .space-y-3');

// Pools atualizadas para o seu banco real
const avatarPools = {
  'older-men': Array.from({ length: 10 }, (_, i) => i + 1),
  'older-women': Array.from({ length: 10 }, (_, i) => i + 1),
  'young-men': Array.from({ length: 13 }, (_, i) => i + 1),
  'young-women': Array.from({ length: 31 }, (_, i) => i + 1),
};

function getRandomLikes() {
  return Math.floor(Math.random() * (70 - 5 + 1)) + 5;
}

// Sem repetição até esgotar o grupo, respeitando seus limites
function getRandomAvatar(gender, ageGroup) {
  let folder = '';
  if (gender === 'male' && ageGroup === 'older') {
    folder = 'older-men';
  } else if (gender === 'female' && ageGroup === 'older') {
    folder = 'older-women';
  } else if (gender === 'male' && ageGroup === 'young') {
    folder = 'young-men';
  } else if (gender === 'female' && ageGroup === 'young') {
    folder = 'young-women';
  }

  // Repopula pool se acabou as opções (libera repetição)
  if (!avatarPools[folder] || avatarPools[folder].length === 0) {
    if (folder === 'older-men') avatarPools[folder] = Array.from({ length: 10 }, (_, i) => i + 1);
    if (folder === 'older-women') avatarPools[folder] = Array.from({ length: 10 }, (_, i) => i + 1);
    if (folder === 'young-men') avatarPools[folder] = Array.from({ length: 13 }, (_, i) => i + 1);
    if (folder === 'young-women') avatarPools[folder] = Array.from({ length: 31 }, (_, i) => i + 1);
  }

  // Sorteia e remove para garantir não repetição até esgotar
  const pool = avatarPools[folder];
  const idx = Math.floor(Math.random() * pool.length);
  const num = pool.splice(idx, 1)[0];

  return `assets/img/people/${folder}/${num}.jpg`;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomTimeAgo() {
  const rand = Math.random();
  if (rand < 0.33) {
    return `${Math.floor(Math.random() * (59 - 5 + 1)) + 5}m`;
  } else if (rand < 0.66) {
    return `${Math.floor(Math.random() * 10) + 1}h`;
  } else {
    return `${Math.floor(Math.random() * 2) + 1}d`;
  }
}

function createCommentElement(commentObj) {
  const likes = getRandomLikes();
  const avatar = getRandomAvatar(commentObj.gender, commentObj.ageGroup);
  const timeAgo = getRandomTimeAgo();

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
          <span class="text-[#65676B]">${timeAgo}</span>
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

// Embaralha e renderiza até 40 comentários
const shuffledComments = shuffleArray(commentsData).slice(0, 40);
shuffledComments.forEach(comment => {
  commentsContainer.insertAdjacentHTML('beforeend', createCommentElement(comment));
});