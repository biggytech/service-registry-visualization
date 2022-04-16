class UseFormInterface {
  #formik;

  constructor(formik) {
    this.#formik = formik;
  }

  get result() {
    return {
      values: this.#formik.values,
      errors: this.#formik.errors,
      change: this.#formik.handleChange,
      submit: this.#formik.handleSubmit,
    }
  }
}

export default UseFormInterface;