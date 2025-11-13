import css from './Sidebar.module.css';
import Link from 'next/link';

const TAGS = [
  { id: 'Todo', name: 'Todo' },
  { id: 'Work', name: 'Work' },
  { id: 'Personal', name: 'Personal' },
  { id: 'Meeting', name: 'Meeting' },
  { id: 'Shopping', name: 'Shopping' },
];

const SidebarNotes = () => {
  return (
    <>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {TAGS.map(tag => (
          <li key={tag.id} className={css.menuItem}>
            <Link href={`/notes/filter/${tag.id}`} className={css.menuLink}>
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarNotes;