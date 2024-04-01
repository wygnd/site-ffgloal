import React, {FC} from 'react';
import {TextBlockComponent} from "@/@types/text-block";
import clsx from "clsx";
import Container from "@/components/container/Container";
import {Button} from "@/components/button/Button";
import './Text-block.scss';

const TextBlock: FC<TextBlockComponent> = ({
                                             block_id,
                                             title = null,
                                             description = null,
                                             button = null,
                                             is_reverse = false,
                                             className = null,
                                             image = null
                                           }) => {
  return (
    <div id={`text-block-${block_id}`} className={clsx(className, "text-block", is_reverse && "reverse-block")}>
      <Container>
        <div className="text-block_holder">
          <div className="text-block_content">
            {title &&
							<h2 className="text-block_title">{title}</h2>
            }
            {description &&
							<div className="text-block_description">{description}</div>
            }
            {button &&
							<Button
								component={"a"}
								href={button.link}
								className="text-block_button btn secondary"
							>{button.text}</Button>
            }
          </div>
          {image &&
						<div className="text-block_image">
							<img
								src={image}
								alt={`text-block-image-${block_id}`}
								decoding="async"
								loading="lazy"
							/>
						</div>
          }
        </div>
      </Container>
    </div>
  );
};

export default TextBlock;