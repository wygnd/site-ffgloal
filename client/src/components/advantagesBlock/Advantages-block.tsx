import React from 'react';
import Container from "@/components/container/Container";
import {IAdvantage} from "@/@types/advantages";
import Icon1 from './images/adv-icon_1.svg';
import Icon2 from './images/adv-icon_2.svg';
import Icon3 from './images/adv-icon_3.svg';
import Icon4 from './images/adv-icon_4.svg';
import Icon5 from './images/adv-icon_5.svg';
import Icon6 from './images/adv-icon_6.svg';
import AdvantageItem from "@/components/advantagesBlock/Advantage-item";
import './Advatage-block.scss';

const advantages: IAdvantage[] = [
  {
    id: 1,
    icon: <Icon1/>,
    name: "Прием от 1 единицы товара",
    desc: "Мы готовы работать с любыми объёмами товаров, независимо от их количества, размеров или сложности. Наша команда обеспечит гарантированную сохранность ваших товаров."
  },
  {
    id: 2,
    icon: <Icon2/>,
    name: "Надежность - чистый опрятный склад",
    desc: "Надёжность и чистота склада — ключевые факторы успешного хранения товаров. Наша компания придаёт большое значение поддержанию высоких стандартов чистоты и порядка на складе."
  },
  {
    id: 3,
    icon: <Icon3/>,
    name: "Забор груза нашими силами",
    desc: "Заберём ваш груз из любой точки Москвы и МО. Мы имеем собственные автомобили различного объёма погрузки, что позволяет гарантировать сроки доставки до складов маркетплейсов."
  },
  {
    id: 4,
    icon: <Icon4/>,
    name: "Гарантия скорости и качества сборки",
    desc: "Наша команда сотрудников имеет большой опыт в сборке и упаковке грузов. Они обучены и квалифицированы для выполнения задач быстро и эффективно."
  },
  {
    id: 5,
    icon: <Icon5/>,
    name: "Уведомления в мессенджерах",
    desc: "Информация по статусу работы, всегда под рукой! На ваш смартфон будут уведомления с информацией о процессе работы с товаром."
  },
  {
    id: 6,
    icon: <Icon6/>,
    name: "Поможем с Личным кабинетом",
    desc: "Мы понимаем как работают алгоритмы маркетплейсов и с удовольствием проконсультируем вас, чтобы вы продавали ещё больше товаров."
  },

]

const AdvantagesBlock = () => {
  return (
    <div id="advantages-block" className="advantages-block">
      <Container>
        <h2 className="advantages-title">Почему именно «FFGlobal»?</h2>
        <div className="advantages-description">Мы делаем упор на качественное предоставление услуг и доступные цены
          для наших клиентов.
        </div>
        <ul className="advantages-holder">
          {advantages.map(item =>
            <AdvantageItem key={item.id} item={item} className="advantages-holder_item"/>
          )}
        </ul>
      </Container>
    </div>
  );
};

export default AdvantagesBlock;