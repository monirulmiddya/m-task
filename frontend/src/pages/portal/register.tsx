import React from "react";
import Auth from "@/layouts/Auth";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Register: React.FC = () => {
  const { register, error, success } = useAuth();

  const handleSubmit = async (values: any) => {
    await register(values);
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">Sign up with</h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Formik
                  initialValues={{
                    name: "",
                    userName: "",
                    email: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">
                          Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${error ? "border-red-500" : ""
                            }`}
                          placeholder="Name"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic" />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="userName"
                        >
                          Username
                        </label>
                        <Field
                          type="text"
                          name="userName"
                          className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${error ? "border-red-500" : ""
                            }`}
                          placeholder="Username"
                        />
                        <ErrorMessage name="userName" component="div" className="text-red-500 text-xs italic" />
                      </div>

                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${error ? "border-red-500" : ""
                            }`}
                          placeholder="Email"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${error ? "border-red-500" : ""
                            }`}
                          placeholder="Password"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
                      </div>

                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <Field
                            id="customCheckLogin"
                            type="checkbox"
                            name="agreeTerms"
                            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          />
                          <span className="ml-2 text-sm font-semibold text-blueGray-600">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              className="text-lightBlue-500"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        >
                          {isSubmitting ? "Submitting..." : "Create Account"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot username?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link href="./login" passHref={true}
                  legacyBehavior={true}>
                  <a className="text-blueGray-200">
                    <small>Already have an account?</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

(Register as any).layout = Auth;

export default Register;
