import Link from 'next/link';
import { ALL_NOTES, TAGS } from '@/lib/allNotes';
import css from './Sidebar.module.css';

const NotesSidebar = () => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/${ALL_NOTES}`} className={`${css.menuLink}`}>
          All notes
        </Link>
      </li>
      {TAGS.map((tag, i) => (
        <li className={css.menuItem} key={'SideBarMenu' + i}>
          <Link href={`/notes/filter/${tag}`} className={`${css.menuLink}`}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
