import React from 'react';
import MainBanner from "@/components/mainBanner/Main-banner";
import TextBlock from "@/components/textBlock/Text-block";
import textBlockImageFirst from "@/components/textBlock/images/text-block_image-1.png";
import textBlockImageSecond from "@/components/textBlock/images/text-block_image-2.png";
import AdvantagesBlock from "@/components/advantagesBlock/Advantages-block";
import FormBlock from "@/components/formBlock/Form-block";
import ReviewsBlock from "@/components/reviewsBlock/Reviews-block";
import ServicesBlock from "@/components/servicesBlock/Services-block";
import QuestionsBlock from "@/components/questionsBlock/Questions-block";
import ContactsBlock from "@/components/contactsBlock/Contacts-block";

const MainPage = () => {


  return (
    <main id="primary">
      <MainBanner/>
      <TextBlock
        block_id={1}
        title="Мы экономим деньги и время наших клиентов"
        description="Откажитесь от сложностей и избыточных затрат, связанных с фулфилментом. Обратившись к нам уже сегодня, вы получите все, что нужно для упрощения и оптимизации процесса обработки заказов!"
        button={{text: "Подробнее", link: "/"}}
        image={textBlockImageFirst}
      />
      <TextBlock
        block_id={2}
        title="Мы действующие селлеры и понимаем, что вам нужно"
        description="Мы не нашли фулфилмент оператора, отвечающего нашим. потребностям. Тогда мы создали «FFGlobal» - компанию, которая делает жизнь селлера легче, а рейтинг выше."
        button={{text: "Подробнее", link: "/"}}
        image={textBlockImageSecond}
        is_reverse={true}
      />
      <AdvantagesBlock/>
      <FormBlock/>
      <ReviewsBlock/>
      <ServicesBlock/>
      <QuestionsBlock/>
      <ContactsBlock/>
    </main>
  );
};

export default MainPage;