import axios from "axios";
import { useDispatch } from "react-redux";
import {
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [params] = useSearchParams();
  const error = params.get("error");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (error === "auth_failed") {
    toast.error("Error while logging in using google! Please try again.");
  }

  const handleGithubLogin = () => {};

  const handleLogin = async (values) => {
    const userDetails = {
      ...values,
    };
    dispatch(loginStart());
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        userDetails,
        { withCredentials: true },
      );
      dispatch(loginSuccess(res.data.user));
    } catch (error) {
      if (error.response?.data) {
        dispatch(loginFailure(error.response?.data.message));
        toast.error(error.response?.data.message);
      }
    }
    form.resetFields();
    navigate("/");
  };


  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)] px-10">
      <div className="flex flex-col gap-3 px-8 py-5 bg-white shadow rounded-2xl w-full sm:w-100">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-lg text-[#4c4c4c]">Sign in to Blog</h1>
          <span className="text-[10px] text-[#cecdd0]">
            Welcome back! Please sign in to Continue
          </span>
        </div>
        {/* Sign-in methods: google, facebook, apple */}
        <div className="flex justify-center items-center gap-1 mt-3">
          {/* google */}
          <a
            className="flex-1 shadow rounded-sm cursor-pointer flex justify-center items-center p-2"
            href={`${import.meta.env.VITE_BACKEND_URL}/users/google`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-google"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
            </svg>
          </a>
          {/* github */}
          <button
            className="flex-1 shadow rounded-sm cursor-pointer flex justify-center items-center p-2"
            onClick={handleGithubLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center items-center gap-1 h-10">
          <hr className=" w-full " />
          <span className="">or</span>
          <hr className="w-full" />
        </div>
        {/* email login */}
        <Form layout="vertical" onFinish={handleLogin} form={form}>
          <Form.Item
            label="Username or Email Address"
            name={"loginInput"}
            rules={[
              {
                required: true,
                message: "Please input your username or email",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input type="password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="p-1! w-full!" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </Form>
        {/* redirect to register page */}
        <div className=" w-full text-[11px] text-center space-x-1 ">
          <span className="text-[#404047]">Dont't have an account?</span>
          <NavLink className={"text-blue-600"} to={"/register"}>
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
