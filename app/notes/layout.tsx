import React from 'react';
import css from './filter/LayoutNotes.module.css'; 
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
};

const NotesLayout = ({ children, sidebar, modal }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>
        {children}
        {modal}
      </div>
    </section>
  );
}
  export default NotesLayout;