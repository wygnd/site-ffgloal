import React from 'react';
import Container from "@/components/container/Container";
import {IServiceItem} from "@/@types/services";
import ServiceItem from "@/components/servicesBlock/Service-item";
import {Button} from "@/components/button/Button";

const prices: IServiceItem[] = [
  {
    id: 1,
    name: "Логистика",
    prices: [
      {
        name: "Забор товара с карго",
        value: "от 1990 ₽"
      },
      {
        name: "Забор товара с рынка",
        value: "от 1990 ₽"
      },
      {
        name: "Забор товара с ТК",
        value: "от 1990 ₽"
      },
      {
        name: "Услуги грузчиков",
        value: "от 190 ₽"
      },
      {
        name: "Забор товара в пределах МКАД",
        value: "от 35 ₽"
      }, {
        name: "Забор товара с опт. точки",
        value: "от 490 ₽"
      }
    ]
  },
  {
    id: 2,
    name: "Приёмка",
    prices: [
      {
        name: "Снятие обрешетки (короб)",
        value: "от 99 ₽"
      }, {
        name: "Снятие обрешетки (паллета)",
        value: "от 490 ₽"
      },
      {
        name: "Ручная выгрузка/загрузка",
        value: "от 190 ₽"
      },
      {
        name: "Выгрузка/загрузка паллет",
        value: "от 290 ₽"
      },
      {
        name: "Приемка товара на наш склад",
        value: "от 1 ₽"
      },
      {
        name: "Сортировка при приёмке",
        value: "от 4 ₽"
      }
    ]
  },
  {
    id: 3,
    name: "Обработка",
    prices: [
      {
        name: "Маркировка стикером",
        value: "от 3 ₽"
      },
      {
        name: "Двойная маркировка",
        value: "от 5 ₽"
      },
      {
        name: "Проверка на брак",
        value: "от 5 ₽"
      },
      {
        name: "Сборка комплектов",
        value: "от 3 ₽"
      }, {
        name: "Отпаривание товара",
        value: "от 8 ₽"
      },
      {
        name: "Упаковка товара",
        value: "от 3 ₽"
      }
    ],
  },
  {
    id: 4,
    name: "Хранение",
    prices: [
      {
        name: "Хранение первую неделю",
        value: "0 ₽"
      },
      {
        name: "Хранение короба 600х400",
        value: "19 ₽"
      },
      {
        name: "Хранение в мешках",
        value: "79 ₽"
      },
      {
        name: "Хранение FBS (полка)",
        value: "690 ₽"
      },
      {
        name: "Хранение FBS (стеллаж)",
        value: "1990 ₽"
      },
      {
        name: "Хранение FBS (паллета)",
        value: "2490 ₽"
      },
    ],
  },
  {
    id: 5,
    name: "Отгрузка",
    prices: [
      {
        name: "Создание этикетки",
        value: "49 ₽"
      },
      {
        name: "Создание поставки",
        value: "290 ₽"
      },
      {
        name: "Формирование коробов",
        value: "15 ₽"
      },
      {
        name: "Политизация паллета",
        value: "149 ₽"
      },
      {
        name: "Деревянная паллета",
        value: "490 ₽"
      },
      {
        name: "Погрузка коробов в машину",
        value: "49 ₽"
      },
    ],
  },
  {
    id: 6,
    name: "Упаковка",
    prices: [
      {
        name: "Короб (разные размеры)",
        value: "от 90 ₽"
      },
      {
        name: "ВПП (пупырка)",
        value: "от 14 ₽"
      },
      {
        name: "Zip-Lock пакет с бегунком",
        value: "от 9 ₽"
      },
      {
        name: "Zip-Lock пакет с замком",
        value: "от 6 ₽"
      },
      {
        name: "БОПП пакет",
        value: "от 4 ₽"
      },
      {
        name: "Курьерский пакет",
        value: "от 5 ₽"
      },
    ],
  },
]

const ServicesBlock = () => {
  return (
    <div className="services-block">
      <Container>
        <h2 className="services-title">Наши услуги</h2>
        <ul className="services-holder">
          {prices.map(price =>
            <ServiceItem key={price.id} item={price}/>
          )}
        </ul>
        <div className="services-footer">
          <div className="services-footer_name">Полный прайс-лист</div>
          <Button component="a" href="/" className="btn primary services-footer_button">Скачать полный
            прайс-лист</Button>
        </div>
      </Container>
    </div>
  );
};

export default ServicesBlock;