import { Request, Response, Router, RequestHandler, NextFunction } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import { loginFailedErr, cookieProps, serverError } from '@shared/constants';
import axios, { AxiosResponse } from 'axios';

import { apiRoot, headers } from '../config';

const router = Router();

export const checkAuth = () => {
    return (req: Request, res: Response, next: NextFunction) => {      
        const jwt = req.signedCookies[cookieProps.key];
        if (!jwt) {
            return res.status(UNAUTHORIZED).json({
                error: loginFailedErr,
            });
        } else {
            next();
        }
    };
};

/******************************************************************************
 *                      Account - "GET /api/account"
 ******************************************************************************/

router.get('/account', checkAuth(), async (req: Request, res: Response) => {
    console.log('getAccount');
    axios.get(`${apiRoot}/v2/account`, { headers }).then((response: AxiosResponse) => {
        try {
            res.status(OK).send(response.data);
        } catch (e) {
            console.log('ERROR', e);
            res.status(500).send({ error: serverError });
        }
    });
});

/******************************************************************************
 *                      Account - "GET /api/historicaldata"
 ******************************************************************************/

router.get('/historicalData', checkAuth(), async (req: Request, res: Response) => {
    console.log('getHistoricalData');
    const params = {
        before: req.query.before,
        limit: req.query.limit,
        symbols: req.query.symbols,
    };

    axios
        .get(`https://data.alpaca.markets/v1/bars/${req.query.timeframe}`, { headers, params })
        .then((response: AxiosResponse) => {
            try {
                res.status(OK).send(response.data);
            } catch (e) {
                console.log('ERROR', e);
                res.status(500).send({ error: serverError });
            }
        });
});

/******************************************************************************
 *                      Orders - "GET/POST/DELETE /api/orders"
 ******************************************************************************/

router.get('/orders', checkAuth(), async (req: Request, res: Response, next: RequestHandler) => {
    console.log('getOrders');
    
    axios.get(`${apiRoot}/v2/orders`, { headers, params: req.query }).then((response: AxiosResponse) => {
        try {
            res.status(OK).send(response.data);
        } catch (e) {
            console.log('ERROR', e);
            res.status(500).send({ error: serverError });
        }
    });
});

router.post('/orders', checkAuth(), async (req: Request, res: Response) => {
    console.log('Post Orders');

    axios.post(`${apiRoot}/v2/orders`, req.body, { headers }).then((response: AxiosResponse) => {
        try {
            res.status(OK).send(response.data);
        } catch (e) {
            console.log('ERROR', e);
            res.status(500).send({ error: serverError });
        }
    });
});

router.delete('/orders', checkAuth(), async (req: Request, res: Response) => {
    console.log('Delete Order');

    axios.delete(`${apiRoot}/v2/orders/${req.query.id}`, { headers }).then((response: AxiosResponse) => {
        try {
            res.status(OK).send(response.data);
        } catch (e) {
            console.log('ERROR', e);
            res.status(500).send({ error: serverError });
        }
    });
});

/******************************************************************************
 *                      Positions - "GET /api/positions"
 ******************************************************************************/

router.get('/positions', checkAuth(), async (req: Request, res: Response) => {
    console.log('getPositions');

    axios.get(`${apiRoot}/v2/positions`, { headers }).then((response: AxiosResponse) => {
        try {
            res.status(OK).send(response.data);
        } catch (e) {
            console.log('ERROR', e);
            res.status(500).send({ error: serverError });
        }
    });
});

/******************************************************************************
 *                      Assets - "GET /api/assets"
 ******************************************************************************/

router.get('/assets', checkAuth(), async (req: Request, res: Response) => {
    console.log('get assets');

    axios.get(`${apiRoot}/v2/assets`, { headers }).then((response: AxiosResponse) => {
        try {
            res.status(OK).send(response.data);
        } catch (e) {
            console.log('ERROR', e);
            res.status(500).send({ error: serverError });
        }
    });
});

/******************************************************************************
 *                      Clock - "GET /api/clock"
 ******************************************************************************/

router.get('/clock', checkAuth(), async (req: Request, res: Response) => {
    console.log('clock');

    axios.get(`${apiRoot}/v2/clock`, { headers }).then((response: AxiosResponse) => {
        try {
            res.status(OK).send(response.data);
        } catch (e) {
            console.log('ERROR', e);
            res.status(500).send({ error: serverError });
        }
    });
});

/******************************************************************************
 *                      Clock - "GET /api/last_quote"
 ******************************************************************************/

 router.get('/last_quote', checkAuth(), async (req: Request, res: Response) => {
    console.log('last_quote');

    axios.get(`${apiRoot}/v1/last_quote/stocks/${req.query.ticker}`, { headers }).then((response: AxiosResponse) => {
        try {
            res.status(OK).send(response.data);
        } catch (e) {
            console.log('ERROR', e);
            res.status(500).send({ error: serverError });
        }
    });
});
 
export const getLastQuote = async (ticker: string) => {
    console.log('TRYIN TO GET');
    ticker = 'AMZN';
    console.log({ url: `${apiRoot}/v1/last_quote/stocks/${ticker}` });
    const dataRoot = 'https://data.alpaca.markets'
    try {
        const response = await axios.get(`${dataRoot}/v2/stocks/${ticker}/trades/latest`, { headers });            
        console.log(`last quote for ${ticker}`, response.data);
    } catch (e) {
        console.log('ERROR', e);
            
    }

}

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
