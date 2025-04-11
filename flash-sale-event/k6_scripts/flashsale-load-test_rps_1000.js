import http from 'k6/http';
import { check } from 'k6';

export const options = {
    scenarios: {
        flashsale_rps_test: {
            executor: 'constant-arrival-rate', // RPS 기반 테스트 설정
            rate: 1000, // 1000 RPS
            timeUnit: '1s',
            duration: '30s',
            preAllocatedVus: 1000,
            maxVUs: 10000,
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_reqs: ['count>29999'],
    },
};

export default function () {
    const eventId = 1;
    const url = `http://localhost:8080/api/flashsale/${eventId}/order`;

    const res = http.post(url);

    check(res, {
    'status is 200 or 400': (r) => r.status === 200 || r.status === 400,
    });
}