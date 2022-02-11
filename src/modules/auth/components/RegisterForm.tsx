import React from 'react';
import { IRegisterParam, IRegisterValidation } from '../../../models/auth';
import { FormattedMessage } from 'react-intl';
import { validateRegister, validRegister } from '../utils';
import { genderFieldLabel } from '../../intl/constants';

interface location {
  id: number;
  name: string;
}

interface Props {
  onReg(values: IRegisterParam): void;
  loading: boolean;
  errorMessage: string;
  location: location[];
  state(pid: number): Promise<any>;
}

const RegisterFrom = (props: Props) => {
  const { onReg, loading, errorMessage, location, state } = props;

  const [formValues, setFormValues] = React.useState<IRegisterParam>({
    email: '',
    password: '',
    name: '',
    repeatPassword: '',
    gender: '',
    region: 0,
    state: 0,
  });
  const [validate, setValidate] = React.useState<IRegisterValidation>();
  const [states, setStates] = React.useState<location[]>();

  const onSubmit = React.useCallback(() => {
    console.log(formValues);

    const validate = validateRegister(formValues);

    setValidate(validate);

    if (!validRegister(validate)) {
      return;
    }

    onReg(formValues);
  }, [formValues, onReg]);

  React.useEffect(() => {
    state(formValues.region).then((resp) => {
      setStates(resp);
      //console.log(resp);
    });
  }, [formValues.region, state]);

  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}

      <div className="col-md-12">
        <label htmlFor="name" className="form-label">
          <FormattedMessage id="userName" />
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={formValues.name}
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
        />

        {!!validate?.name && (
          <small className="text-danger">
            <FormattedMessage id={validate?.name} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          value={formValues.email}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />

        {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id="password" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          value={formValues.password}
          onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
        />

        {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputRePassword" className="form-label">
          <FormattedMessage id="repeatPassword" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputRePassword"
          value={formValues.repeatPassword}
          onChange={(e) => setFormValues({ ...formValues, repeatPassword: e.target.value })}
        />

        {!!validate?.repeatPassword && (
          <small className="text-danger">
            <FormattedMessage id={validate?.repeatPassword} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <FormattedMessage id="region" />
        <select
          className="form-select"
          aria-label="select"
          onChange={(e) => {
            console.log(e.target.value);

            setFormValues({ ...formValues, region: +e.target.value });
          }}
        >
          <option value={undefined}>Chọn Quốc Gia</option>
          {location.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>

        {!!validate?.region && (
          <small className="text-danger">
            <FormattedMessage id={validate?.region} />
          </small>
        )}
      </div>

      {states && (
        <div className="col-md-12">
          <FormattedMessage id="state" />
          <select
            className="form-select"
            aria-label="select"
            onChange={(e) => {
              setFormValues({ ...formValues, state: +e.target.value });
            }}
          >
            <option value={undefined}>Chọn Tiểu Bang</option>
            {states?.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>

          {!!validate?.state && (
            <small className="text-danger">
              <FormattedMessage id={validate?.state} />
            </small>
          )}
        </div>
      )}

      <div className="col-md-12">
        <FormattedMessage id="gender" />
        <select
          className="form-select"
          aria-label="select"
          onChange={(e) => {
            setFormValues({ ...formValues, gender: e.target.value });
          }}
        >
          <option value={undefined}>Chọn giới tính</option>
          {genderFieldLabel?.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            );
          })}
        </select>
        {!!validate?.gender && (
          <small className="text-danger">
            <FormattedMessage id={validate?.gender} />
          </small>
        )}
      </div>

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="signUp" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterFrom;
