import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-[8px] border border-[#EBEDF1] bg-[#FAFBFB] text-[#3B5374] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] after:flex-1 hover:bg-[#DB4437]/90">
            <span className="pointer-events-none me-2 flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <g clipPath="url(#clip0_1087_2484)">
                  <path
                    d="M23.7663 12.7765C23.7663 11.9608 23.7001 11.1406 23.559 10.3381H12.2402V14.9591H18.722C18.453 16.4495 17.5888 17.7679 16.3233 18.6056V21.604H20.1903C22.4611 19.514 23.7663 16.4274 23.7663 12.7765Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.2391 24.5008C15.4756 24.5008 18.205 23.4382 20.1936 21.6039L16.3266 18.6055C15.2507 19.3375 13.8618 19.752 12.2435 19.752C9.11291 19.752 6.45849 17.6399 5.50607 14.8003H1.51562V17.8912C3.55274 21.9434 7.70192 24.5008 12.2391 24.5008Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.50277 14.8002C5.00011 13.3099 5.00011 11.696 5.50277 10.2057V7.11475H1.51674C-0.185266 10.5055 -0.185266 14.5004 1.51674 17.8912L5.50277 14.8002Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M12.2391 5.24966C13.9499 5.2232 15.6034 5.86697 16.8425 7.04867L20.2685 3.62262C18.0991 1.5855 15.2198 0.465534 12.2391 0.500809C7.70192 0.500809 3.55274 3.05822 1.51562 7.11481L5.50166 10.2058C6.44967 7.36173 9.1085 5.24966 12.2391 5.24966Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1087_2484">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            Continue with Google
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chose a Role</DialogTitle>
            <DialogDescription>
              <p className="text-[#3B5374] text-[16px] font-normal leading-[150%]">
                Please select a role to continue. You can always change it later
                in your profile settings.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button className="rounded-[8px] border w-full text-sm font-semibold">
              Continue as Landlord
            </Button>
            <Button className="rounded-[8px] border w-full text-sm font-semibold">
              Continue as Tenant
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button className="rounded-[8px] border border-[#EBEDF1] bg-[#FAFBFB] text-[#3B5374] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] after:flex-1 hover:bg-[#14171a]/90">
        <span className="pointer-events-none me-2 flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <g clipPath="url(#clip0_1087_2491)">
              <path
                d="M24 12.5C24 5.87258 18.6274 0.5 12 0.5C5.37258 0.5 0 5.87258 0 12.5C0 18.4895 4.3882 23.454 10.125 24.3542V15.9688H7.07812V12.5H10.125V9.85625C10.125 6.84875 11.9166 5.1875 14.6576 5.1875C15.9701 5.1875 17.3438 5.42188 17.3438 5.42188V8.375H15.8306C14.34 8.375 13.875 9.30008 13.875 10.25V12.5H17.2031L16.6711 15.9688H13.875V24.3542C19.6118 23.454 24 18.4895 24 12.5Z"
                fill="#1877F2"
              />
              <path
                d="M16.6711 15.9688L17.2031 12.5H13.875V10.25C13.875 9.30102 14.34 8.375 15.8306 8.375H17.3438V5.42188C17.3438 5.42188 15.9705 5.1875 14.6576 5.1875C11.9166 5.1875 10.125 6.84875 10.125 9.85625V12.5H7.07812V15.9688H10.125V24.3542C11.3674 24.5486 12.6326 24.5486 13.875 24.3542V15.9688H16.6711Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1087_2491">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        Continue with Facebook
      </Button>
      <Button className="rounded-[8px] border border-[#EBEDF1] bg-[#FAFBFB] text-[#3B5374] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] after:flex-1 hover:bg-[#1877f2]/90">
        <span className="pointer-events-none me-2 flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <g clipPath="url(#clip0_1087_2496)">
              <path
                d="M21.3418 17.6449C21.0091 18.4135 20.6153 19.1211 20.159 19.7715C19.5371 20.6583 19.0278 21.2721 18.6354 21.613C18.027 22.1724 17.3752 22.459 16.6772 22.4753C16.1761 22.4753 15.5718 22.3327 14.8683 22.0434C14.1626 21.7555 13.514 21.613 12.921 21.613C12.2991 21.613 11.632 21.7555 10.9185 22.0434C10.204 22.3327 9.62831 22.4834 9.18819 22.4984C8.51884 22.5269 7.85166 22.2322 7.18571 21.613C6.76066 21.2422 6.22901 20.6067 5.59212 19.7063C4.90878 18.7449 4.34698 17.63 3.90686 16.3589C3.43551 14.986 3.19922 13.6565 3.19922 12.3694C3.19922 10.8951 3.5178 9.62345 4.15592 8.55784C4.65742 7.70191 5.32459 7.02672 6.15962 6.53105C6.99464 6.03539 7.89688 5.7828 8.86852 5.76664C9.40017 5.76664 10.0974 5.93109 10.9637 6.25429C11.8277 6.57858 12.3824 6.74303 12.6256 6.74303C12.8075 6.74303 13.4237 6.55074 14.4684 6.16738C15.4564 5.81186 16.2902 5.66466 16.9732 5.72264C18.8241 5.87202 20.2147 6.60167 21.1395 7.91619C19.4841 8.9192 18.6653 10.324 18.6816 12.1262C18.6965 13.53 19.2057 14.6981 20.2066 15.6256C20.6601 16.0561 21.1667 16.3888 21.7302 16.6251C21.608 16.9795 21.479 17.319 21.3418 17.6449ZM17.0968 0.940369C17.0968 2.04062 16.6948 3.06792 15.8936 4.01878C14.9267 5.14917 13.7572 5.80236 12.489 5.69929C12.4729 5.56729 12.4635 5.42837 12.4635 5.28239C12.4635 4.22615 12.9233 3.09576 13.7399 2.17152C14.1475 1.70356 14.666 1.31445 15.2948 1.00406C15.9221 0.698295 16.5156 0.529201 17.0737 0.500244C17.09 0.647331 17.0968 0.794426 17.0968 0.940355V0.940369Z"
                fill="#00204A"
              />
            </g>
            <defs>
              <clipPath id="clip0_1087_2496">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        Continue with Apple
      </Button>
    </div>
  );
};

export default SocialLogin;
