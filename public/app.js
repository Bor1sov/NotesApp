async function remove(id) {
  fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, title) {
  const newTitle = prompt('Введите новое название', title);
  if (newTitle !== null && newTitle.trim() !== '') {
    try {
      const response = await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
      });

      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }

      const li = document.querySelector(`[data-id="${id}"]`).closest('li');
      li.querySelector('.note-title').textContent = newTitle;
    } catch (err) {
      console.error('Ошибка при обновлении:', err);
      alert('Не удалось обновить заметку');
    }
  }
}
document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const title = event.target.closest('li').querySelector('.note-title').textContent;
    edit(id, title);
  }
});