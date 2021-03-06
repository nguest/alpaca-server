/** @jsx jsx */
import { css, jsx, InterpolationWithTheme } from '@emotion/core';
import React, { MouseEvent, Node, AnchorHTMLAttributes, ReactElement } from 'react';
import { historyPush, historyReplace } from '..';
import { base } from './styles.ts';

interface Params {
    active: boolean;
    children: Node;
    cssOverrides?: object | InterpolationWithTheme<any>;
    disabled?: boolean;
    icon?: string;
    isButton?: boolean;
    replace?: boolean;
    styleOverrides?: object;
    title?: string;
    to: string;
    type?: string;
}

const Link = ({
    active,
    children,
    cssOverrides,
    disabled,
    icon,
    isButton,
    replace,
    styleOverrides,
    title,
    to,
    type,
}: Params): ReactElement<any> => {
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        return replace ? historyReplace(to) : historyPush(to);
    };

    return (
        <a
            href={to}
            onClick={handleClick}
            css={cssOverrides || base(active, disabled, isButton, styleOverrides, type)}
            title={title}
        >
            {children}
            {icon && <i className={`icon ion-md-${icon}`} />}
        </a>
    );
};

export default Link;
