import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { changePassword, Profile } from "../../services/profileService";
import { useState } from "react";
import useAlert from "../../hooks/useAlert";
import Form from "../form/Form";
import Alert from "../ui/alert/Alert";

export default function UserInfoCard({ profile }: { profile: Profile | null }) {
  const { isOpen, openModal, closeModal } = useModal();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorOldPassword, setErrorOldPassword] = useState(false);
  const [errorMessageOldPassword, setErrorMessageOldPassword] = useState<string | null>(null);
  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const [errorMessageNewPassword, setErrorMessageNewPassword] = useState<string | null>(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const alert = useAlert();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleChangePassword();
  };

  async function handleChangePassword() {
    if (!token) return;

    // Reset errors
    setError(false);
    setErrorMessage(null);
    setErrorOldPassword(false);
    setErrorMessageOldPassword(null);
    setErrorNewPassword(false);
    setErrorMessageNewPassword(null);
    setErrorConfirmPassword(false);
    setErrorMessageConfirmPassword(null);

    // Validate password match
    if (newPassword !== confirmPassword) {
      setError(true);
      setErrorMessage("New password and confirm password do not match.");
      setErrorNewPassword(true);
      setErrorMessageNewPassword("Passwords do not match.");
      return;
    }

    const response = await changePassword(token, oldPassword, newPassword, confirmPassword);

    if (response.success) {
      alert.success("Password changed successfully.");
      closeModal();
    } else {
      setError(true);
      setErrorMessage(response.message);
      if (response.data) {
        setErrorOldPassword(!!response.data.oldPassword);
        setErrorMessageOldPassword(response.data.oldPassword ?? null);
        setErrorNewPassword(!!response.data.newPassword);
        setErrorMessageNewPassword(response.data.newPassword ?? null);
        setErrorConfirmPassword(!!response.data.confirmPassword);
        setErrorMessageConfirmPassword(response.data.confirmPassword ?? null);
      }
    }
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile ? profile.fullName : "Loading..."}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile ? profile.email : "Loading..."}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile ? profile.phone : "Loading..."}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile ? (profile.status === 1 ? "Active" : "Inactive") : "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Change Password
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Password
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your password to keep your profile secure.
            </p>
          </div>

          {
            error ?
              <Alert
                variant="error"
                title="Failed to Change Password"
                message={errorMessage || "There was an error changing your password. Please try again."}
                showLink={false}
              /> : null
          }

          <Form className="flex flex-col" onSubmit={handleSave}>
            <Input type="hidden" name="id" value={profile?.id} />
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Old Password</Label>
                    <Input
                      type="password"
                      onChange={e => setOldPassword(e.target.value)}
                      error={errorOldPassword}
                      hint={errorOldPassword ? errorMessageOldPassword ?? "" : ""}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      onChange={e => setNewPassword(e.target.value)}
                      error={errorNewPassword}
                      hint={errorNewPassword ? errorMessageNewPassword ?? "" : ""}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      onChange={e => setConfirmPassword(e.target.value)}
                      error={errorConfirmPassword}
                      hint={errorConfirmPassword ? errorMessageConfirmPassword ?? "" : ""}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm">
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
