import { camelizeKeys } from 'humps';

export function initProcessors(store, type) {
  var base = type.base, commit = store.commit;

  commit(base, { type: type.processing, value: false });
}

export function genProcessors(store, type) {
  return { processing: CommitProcessing(store, type) };
}

export function genProcessors4Login(store, type) {
  var base = type.base;

  return { processing: CommitProcessing(store, type), success: CommitSuccess4Login(store, type) };
}

function CommitProcessing(store, type) {
  var base = type.base, commit = store.commit;
  
  return function processing() {
    commit(base, { type: type.success, data: null, message: '', status: 0 });
    commit(base, { type: type.failure, error: null });
    commit(base, { type: type.processing, value: true });
  }
}

function CommitSuccess4Login(store, type) {
  var base = type.base, commit = store.commit;
  
  return function success(response) {
    commit(base, { type: type.success, data: camelizeKeys(response.data), message: response.statusText, status: response.status });
  }
}
