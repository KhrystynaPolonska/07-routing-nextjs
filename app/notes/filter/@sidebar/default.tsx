import Link from 'next/link';
import css from './Sidebar.module.css';
import type { NoteTag } from '@/types/note';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


function NotesSidebar() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {TAGS.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${encodeURIComponent(tag)}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NotesSidebar;
