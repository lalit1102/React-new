import React, { useState } from 'react';

const initialFeedback = [
  {
    id: 1,
    guestName: 'Alice Johnson',
    roomNumber: '204',
    rating: 5,
    comment: 'Fantastic stay! Very clean and quiet.',
  },
  {
    id: 2,
    guestName: 'Michael Brown',
    roomNumber: '315',
    rating: 4,
    comment: 'Great service, but Wi‑Fi was a bit slow.',
  },
];

function FeedbackForm({ onSubmit, onCancel, initialValue }) {
  const [guestName, setGuestName] = useState(initialValue?.guestName || '');
  const [roomNumber, setRoomNumber] = useState(initialValue?.roomNumber || '');
  const [rating, setRating] = useState(initialValue?.rating || 5);
  const [comment, setComment] = useState(initialValue?.comment || '');

  function handleSubmit(e) {
    e.preventDefault();
    if (!guestName.trim() || !roomNumber.trim() || !comment.trim()) return;

    onSubmit({
      guestName: guestName.trim(),
      roomNumber: roomNumber.trim(),
      rating: Number(rating),
      comment: comment.trim(),
    });

    if (!initialValue) {
      setGuestName('');
      setRoomNumber('');
      setRating(5);
      setComment('');
    }
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>{initialValue ? 'Edit Feedback' : 'Add Feedback'}</h2>

      <div className="field-row">
        <label>
          Guest name
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Enter guest name"
          />
        </label>

        <label>
          Room #
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder="e.g. 204"
          />
        </label>
      </div>

      <div className="field-row">
        <label>
          Rating
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} star{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Comment
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="How was the stay?"
        />
      </label>

      <div className="button-row">
        {initialValue && (
          <button type="button" className="btn secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn primary">
          {initialValue ? 'Save changes' : 'Add feedback'}
        </button>
      </div>
    </form>
  );
}

function FeedbackItem({ item, onEdit, onDelete }) {
  return (
    <div className="card feedback-card">
      <div className="feedback-header">
        <div>
          <h3>{item.guestName}</h3>
          <p className="subtle">
            Room {item.roomNumber} • {item.rating}★
          </p>
        </div>
        <div className="chip">Rating {item.rating}/5</div>
      </div>
      <p className="comment">{item.comment}</p>
      <div className="button-row right">
        <button className="btn secondary" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button className="btn danger" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

function FeedbackList({ items, onEdit, onDelete }) {
  if (!items.length) {
    return (
      <div className="empty-state card">
        <p>No feedback yet. Add the first guest review!</p>
      </div>
    );
  }

  return (
    <div className="list">
      {items.map((item) => (
        <FeedbackItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [editing, setEditing] = useState(null);

  const total = feedback.length;
  const average =
    total === 0
      ? 0
      : (feedback.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1);

  function handleCreate(newItem) {
    setFeedback((prev) => [
      {
        id: Date.now(),
        ...newItem,
      },
      ...prev,
    ]);
  }

  function handleUpdate(updatedItem) {
    setFeedback((prev) =>
      prev.map((item) =>
        item.id === editing.id ? { ...item, ...updatedItem } : item
      )
    );
    setEditing(null);
  }

  function handleDelete(id) {
    setFeedback((prev) => prev.filter((item) => item.id !== id));
    if (editing && editing.id === id) {
      setEditing(null);
    }
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand">
          <span className="logo-circle">H</span>
          <div>
            <h1>Hotel Feedback</h1>
            <p className="subtle">Simple CRUD app in pure React (JSX)</p>
          </div>
        </div>
        <div className="stats">
          <span>{total} reviews</span>
          <span>Average rating: {average}</span>
        </div>
      </header>

      <main className="layout">
        <section className="left-column">
          <FeedbackForm
            key={editing ? editing.id : 'create'}
            initialValue={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => setEditing(null)}
          />
        </section>

        <section className="right-column">
          <FeedbackList
            items={feedback}
            onEdit={(item) => setEditing(item)}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}


