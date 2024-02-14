import React, {FC} from 'react';

interface IMenu {
    name: string,
    list?: string[],
    location: string,
}

const Menu: FC<IMenu> = ({name, location}) => {
    return (
        <nav id={name} data-location={location}>
            <ul>
                <li>

                </li>
            </ul>
        </nav>
    );
};

export default Menu;