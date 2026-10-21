import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
  return (
    <div className="flex justify-center px-4 py-8 sm:px-6 sm:py-12">
      <UserProfile
        appearance={{
          elements: {
            avatarBox: "w-10 h-10 rounded-full",
            userButtonPopoverActionButton:
              "text-black/500 hover:bg-gray-100 duration-200",
            userButtonPopoverFooter: "hidden",
            footerItem: "hidden",
            navbarButton:
              "bg-gray-100 my-2 p-2 hover:bg-gray-200 duration-200",
            navbar: "bg-gray-300",
            cardBox: "h-fit max-w-full",
            userPreviewAvatarImage: "w-100",
            input: "text-black bg-gray-50",
            button: "text-black",
            profileSectionPrimaryButton__danger:
              "text-red-900 hover:bg-red-200 duration-300",
          },
          variables: {
            colorPrimary: "#0d9488",
            colorBackground: "#fff",
            colorForeground: "#111827",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
}
