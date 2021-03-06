/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect, Fragment } from 'react';
import { AccountData } from '../../../redux/reducers/types';

import styles from './styles';

const commaNum = (n: string) => parseInt(n, 10).toLocaleString('en-US', { minimumFractionDigits: 2 });

const AccountBox = ({ accountData, onRequestAccountData }: AccountBoxProps) => {
    let title = 'Waiting';
    useEffect(() => {
        onRequestAccountData();
    }, []);

    if (accountData) {
        title = 'Account';
    }

    return (
        <section css={styles.container}>
            <header style={styles.header}>
                <h3 css={styles.h3}>{title}</h3>
            </header>
            <div css={styles.content}>
                {accountData && (
                    <Fragment>
                        <div css={styles.smallHeader}>Buying Power</div>
                        <div css={styles.balance}>{commaNum(accountData.buying_power)}</div>
                        <div css={styles.smallHeader}>Cash</div>
                        <div css={styles.balance}>{commaNum(accountData.cash)}</div>
                        <div css={styles.smallHeader}>Portfolio Value</div>
                        <div css={styles.balance}>{commaNum(accountData.portfolio_value)}</div>
                    </Fragment>
                )}
            </div>
        </section>
    );
};

interface AccountBoxProps {
    accountData?: AccountData;
    onRequestAccountData: () => void;
}

export default AccountBox;
