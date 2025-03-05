import styles from './styles.module.scss';

function ColorItem({ name, color }: { name: string; color: string }) {
  return (
    <div className={styles.colorItem}>
      <div className={styles.colorCircle} style={{ backgroundColor: color }} />
      <span>{name}</span>
    </div>
  );
}
export default ColorItem;
