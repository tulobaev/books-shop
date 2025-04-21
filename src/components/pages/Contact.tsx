import { FC } from "react";
import scss from "./Contact.module.scss";
import { GrSend } from "react-icons/gr";

const Contact: FC = () => {
  return (
    <section className={scss.Contact}>
      <div className={scss.container}>
        <div className={scss.card}>
          <h2>Сайттын ээсине кайрылуу</h2>
          <p>
            Биз ар дайым байланыштабыз. Төмөнкү форманы толтуруңуз, биз сизге
            мүмкүн болушунча тезирээк жооп беребиз.
          </p>
          <form className={scss.form}>
            <div className={scss.field}>
              <label htmlFor="name">Аты</label>
              <input type="text" id="name" placeholder="Атыныз" required />
            </div>
            <div className={scss.field}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                required
              />
            </div>
            <div className={scss.field}>
              <label htmlFor="subject">Тема</label>
              <input
                type="text"
                id="subject"
                placeholder="Каттын темасын жазыныз?"
                required
              />
            </div>
            <div className={scss.field}>
              <label htmlFor="message">Кат</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Кабарыңызды киргизиңиз..."
                required
              />
            </div>
            <button  type="submit">
              Жиберүү <GrSend />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
