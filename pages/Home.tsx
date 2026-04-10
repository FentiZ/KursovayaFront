import { motion } from "framer-motion";

const Card = ({ children, className = "" }: any) => (
  <motion.div
    className={`card ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="grid">
      <Card>
        <h3>Середній бал</h3>
        <p className="big">10.5</p>
      </Card>

      <Card>
        <h3>Відвідуваність</h3>
        <p className="big">92%</p>
      </Card>

      <Card className="wide">
        <h3>Календар</h3>
        <p>Тут буде інтерактивний календар</p>
      </Card>

      <Card>
        <h3>Чати</h3>
        <p>3 нових повідомлення</p>
      </Card>

      <Card>
        <h3>Курси</h3>
        <p>5 активних курсів</p>
      </Card>
    </div>
  );
}