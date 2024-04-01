import React from 'react';
import Container from "@/components/container/Container";
import {Button} from "@/components/button/Button";

const NotFound = () => {
  return (
    <main id="primary">
      <Container>
        <div className="not-found_holder">
          <div className="not-found_error">404</div>
          <h1 className="not-found_title">Страница не найдена</h1>
          <div className="not-found_desc">Данная страница находится в разработке или её не существует. Пожалуйста,
            вернитесь на главную
          </div>
          <Button component={"a"} href={"/"} className="btn primary not-found_btn">Вернуться на главную</Button>
        </div>
      </Container>
    </main>
  );
};

export default NotFound;