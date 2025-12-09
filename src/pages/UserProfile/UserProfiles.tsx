import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserMetaCard from "../../components/UserProfile/UserMetaCard";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import { fetchProfile, Profile } from "../../services/profileService";

export default function UserProfiles() {

  const [profile, setProfile] = useState<Profile | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetchProfile(token)
      .then(response => {
        if (response.success) {
          setProfile(response.data);
        } else {
          console.error("Failed to fetch profile:", response.message);
        }
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });
  }, [token]);

  return (
    <>
      <PageMeta
        title="Profile Dashboard | SIKAS"
        description="User profile dashboard page of SIKAS application"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard profile={profile} />
          <UserInfoCard profile={profile} />
        </div>
      </div>
    </>
  );
}
