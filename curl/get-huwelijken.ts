import { DefaultService } from './tmp/services/DefaultService';

DefaultService.getHuwelijken().then(
  (r) => console.log(r),
  (e) => console.error(e),
);
