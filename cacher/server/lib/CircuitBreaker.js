import axios from 'axios';

const STATES = {
  CLOSED: 'CLOSED',
  OPEN: 'OPEN',
  HALF: 'HALF'
};

class CircuitBreaker {
  constructor(log) {
    this.states = {};
    this.failureThreshold = 5;
    this.coolDownPeriod = 10;
    this.requestTimeout = 1;
    this.log = log;
  }

  async callService(url, options) {
    const endpoint = `${options.method || 'GET'}:${url}`;

    if (!this.canRequest(endpoint)) {
      return false;
    }

    options.timeout = this.requestTimeout * 1000;

    try {
      const result = await axios(url, options);
      this.onSuccess(endpoint);
      return result.data;
    } catch (err) {
      this.onFailure(endpoint);
      return false;
    }
  }

  onSuccess(endpoint) {
    this.initState(endpoint);
  }

  onFailure(endpoint) {
    const state = this.states[endpoint];
    state.failures += 1;

    if (state.failures > this.failureThreshold) {
      state.circuit = STATES.OPEN;
      state.nextTry = new Date() / 1000 + this.coolDownPeriod;
      this.log.info(`Alert! Circuit for ${endpoint} is in state ${STATES.OPEN}`);
    }
  }

  canRequest(endpoint) {
    if (!this.states[endpoint]) {
      this.initState(endpoint);
    }

    const state = this.states[endpoint];

    if (state.circuit === STATES.CLOSED) {
      return true;
    }

    const now = new Date() / 1000;
    if (state.nextTry <= now) {
      state.circuit = STATES.HALF;
      return true;
    }

    return false;
  }

  initState(endpoint) {
    this.states[endpoint] = {
      failures: 0,
      coolDownPeriod: this.coolDownPeriod,
      circuit: STATES.CLOSED,
      nextTry: 0
    };
  }
}

export default CircuitBreaker;