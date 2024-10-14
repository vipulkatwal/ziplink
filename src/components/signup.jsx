import {useEffect, useState} from "react";
import Error from "./error";
import {Input} from "./ui/input";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {Button} from "./ui/button";
import {useNavigate, useSearchParams} from "react-router-dom";
import {signup} from "@/db/apiAuth";
import {BeatLoader} from "react-spinners";
import useFetch from "@/hooks/use-fetch";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const {name, value, files} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const {loading, error, fn: fnSignup, data} = useFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, {abortEarly: false});
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({api: error.message});
      }
    }
  };

  return (
     <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>
              Create a new account if you haven&rsquo;t already
            </CardDescription>
            {error && <Error message={error?.message} />}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                name="name"
                type="text"
                placeholder="Enter Name"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <Error message={errors.name} />}
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Enter Email"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <Error message={errors.email} />}
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Enter Password"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <Error message={errors.password} />}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add Profile Picture:
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed  hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 group-hover:text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a photo
                    </p>
                  </div>
                  <input
                    name="profile_pic"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="opacity-0"
                  />
                </label>
              </div>
              {errors.profile_pic && <Error message={errors.profile_pic} />}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSignup}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              {loading ? (
                <BeatLoader size={10} color="#ffffff" />
              ) : (
                "Create Account"
              )}
            </Button>
          </CardFooter>
        </Card>
  );
};

export default Signup;
