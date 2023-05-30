import React, { FC } from 'react';

import styles from './SocialMedia.module.scss';

export enum SocialMediaType {
  VK = 'VK',
  Instagram = 'Instagram',
  Facebook = 'Facebook',
  Telegram = 'Telegram',
  YouTube = 'YouTube',
  Twitter = 'Twitter',
}

export interface SocialMediaProps {
  type: SocialMediaType;
}

export const SocialMedia: FC<SocialMediaProps> = ({ type }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.SocialMedia}
  >
    {type === SocialMediaType.VK && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20ZM21.0462 26.5634C21.0462 26.5634 21.4312 26.5214 21.6284 26.3135C21.8089 26.123 21.8027 25.7635 21.8027 25.7635C21.8027 25.7635 21.7787 24.0848 22.5727 23.8369C23.3553 23.5932 24.3601 25.4603 25.4264 26.1783C26.232 26.7211 26.8434 26.6023 26.8434 26.6023L29.693 26.5634C29.693 26.5634 31.183 26.4733 30.4766 25.3231C30.4181 25.2288 30.0644 24.4719 28.3584 22.9172C26.5711 21.2897 26.811 21.5529 28.9626 18.7374C30.2731 17.0229 30.7969 15.9761 30.6331 15.5285C30.4776 15.1004 29.5135 15.2141 29.5135 15.2141L26.306 15.2336C26.306 15.2336 26.0681 15.2018 25.8918 15.3052C25.7196 15.4066 25.608 15.6432 25.608 15.6432C25.608 15.6432 25.1009 16.9696 24.4237 18.0983C22.9953 20.4785 22.4245 20.6045 22.1908 20.457C21.6472 20.1119 21.7828 19.0723 21.7828 18.3338C21.7828 16.0263 22.1397 15.0646 21.089 14.8157C20.7405 14.7327 20.4838 14.6784 19.5917 14.6692C18.447 14.6579 17.4788 14.6733 16.9299 14.9365C16.5647 15.1117 16.283 15.5029 16.4552 15.5255C16.667 15.5531 17.1469 15.6525 17.4015 15.9925C17.7302 16.4319 17.7187 17.4172 17.7187 17.4172C17.7187 17.4172 17.9076 20.1334 17.2774 20.4704C16.8454 20.7018 16.2527 20.2297 14.9787 18.0696C14.3266 16.9634 13.8341 15.7405 13.8341 15.7405C13.8341 15.7405 13.7392 15.5121 13.5691 15.3892C13.3635 15.2407 13.0766 15.1946 13.0766 15.1946L10.0288 15.2141C10.0288 15.2141 9.57072 15.2264 9.40273 15.422C9.25352 15.5951 9.39125 15.9546 9.39125 15.9546C9.39125 15.9546 11.7775 21.4352 14.48 24.1975C16.9581 26.7293 19.7711 26.5634 19.7711 26.5634H21.0462Z"
        fill="#C4C4C4"
      />
    )}
    {type === SocialMediaType.Instagram && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0ZM15.6027 9.39778C16.7405 9.346 17.1041 9.33333 20.001 9.33333H19.9977C22.8955 9.33333 23.2577 9.346 24.3955 9.39778C25.5311 9.44978 26.3066 9.62956 26.9866 9.89334C27.6889 10.1656 28.2822 10.53 28.8755 11.1234C29.4689 11.7162 29.8333 12.3114 30.1067 13.0129C30.3689 13.6912 30.5489 14.4663 30.6022 15.6018C30.6533 16.7396 30.6667 17.1032 30.6667 20.0001C30.6667 22.897 30.6533 23.2597 30.6022 24.3975C30.5489 25.5326 30.3689 26.308 30.1067 26.9864C29.8333 27.6877 29.4689 28.2829 28.8755 28.8758C28.2829 29.4691 27.6886 29.8344 26.9873 30.1069C26.3086 30.3707 25.5326 30.5504 24.397 30.6024C23.2593 30.6542 22.8968 30.6669 19.9997 30.6669C17.103 30.6669 16.7396 30.6542 15.6018 30.6024C14.4665 30.5504 13.6912 30.3707 13.0125 30.1069C12.3114 29.8344 11.7162 29.4691 11.1236 28.8758C10.5305 28.2829 10.166 27.6877 9.89334 26.9862C9.62978 26.308 9.45 25.5328 9.39778 24.3973C9.34622 23.2595 9.33333 22.897 9.33333 20.0001C9.33333 17.1032 9.34667 16.7394 9.39756 15.6016C9.44867 14.4665 9.62867 13.6912 9.89312 13.0127C10.1665 12.3114 10.5309 11.7162 11.1242 11.1234C11.7171 10.5302 12.3123 10.1658 13.0138 9.89334C13.692 9.62956 14.4672 9.44978 15.6027 9.39778ZM24.4148 14.3063C24.4148 13.5994 24.9882 13.0267 25.6948 13.0267C26.4015 13.0267 26.9748 13.5996 26.9748 14.3063C26.9748 15.0129 26.4015 15.5863 25.6948 15.5863C24.9882 15.5863 24.4148 15.0129 24.4148 14.3063ZM14.5232 20.0001C14.5232 16.975 16.9759 14.5223 20.001 14.5223C23.0261 14.5223 25.4779 16.975 25.4779 20.0001C25.4779 23.0253 23.0261 25.4768 20.001 25.4768C16.9759 25.4768 14.5232 23.0253 14.5232 20.0001ZM23.5566 19.9999C23.5566 18.0361 21.9646 16.4443 20.001 16.4443C18.0372 16.4443 16.4454 18.0361 16.4454 19.9999C16.4454 21.9635 18.0372 23.5555 20.001 23.5555C21.9646 23.5555 23.5566 21.9635 23.5566 19.9999Z"
        fill="#C4C4C4"
      />
    )}
    {type === SocialMediaType.Facebook && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20ZM22.0846 31.7596V20.8785H25.0883L25.4863 17.1288H22.0846L22.0897 15.2521C22.0897 14.2741 22.1827 13.7501 23.5873 13.7501H25.4651V10H22.461C18.8526 10 17.5826 11.819 17.5826 14.878V17.1293H15.3333V20.8789H17.5826V31.7596H22.0846Z"
        fill="#C4C4C4"
      />
    )}
    {type === SocialMediaType.YouTube && (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20ZM30.2208 15.061C29.9755 14.1185 29.2526 13.3763 28.3347 13.1244C26.6712 12.6667 20 12.6667 20 12.6667C20 12.6667 13.3288 12.6667 11.6652 13.1244C10.7473 13.3763 10.0244 14.1185 9.77903 15.061C9.33333 16.7692 9.33333 20.3333 9.33333 20.3333C9.33333 20.3333 9.33333 23.8973 9.77903 25.6056C10.0244 26.5482 10.7473 27.2903 11.6652 27.5423C13.3288 28 20 28 20 28C20 28 26.6712 28 28.3347 27.5423C29.2526 27.2903 29.9755 26.5482 30.2208 25.6056C30.6667 23.8973 30.6667 20.3333 30.6667 20.3333C30.6667 20.3333 30.6667 16.7692 30.2208 15.061Z"
          fill="#C4C4C4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 24.0007V17.334L23.3333 20.6674L18 24.0007Z"
          fill="#C4C4C4"
        />
      </>
    )}
    {type === SocialMediaType.Telegram && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40 20C40 31.0457 31.0457 40 20 40C8.95433 40 0 31.0457 0 20C0 8.95433 8.95433 0 20 0C31.0457 0 40 8.95433 40 20ZM13.3929 18.1679C11.3894 19.0427 9.33092 19.9415 7.44854 20.9783C6.46564 21.698 7.77198 22.2071 8.99758 22.6846C9.19242 22.7605 9.38517 22.8356 9.56642 22.9106C9.71725 22.957 9.87058 23.0058 10.026 23.0553C11.3891 23.4896 12.9089 23.9738 14.2323 23.2454C16.4061 21.9967 18.4575 20.553 20.5074 19.1104C21.179 18.6377 21.8504 18.1653 22.5259 17.6997C22.5576 17.6795 22.5933 17.6563 22.6323 17.6311C23.2078 17.258 24.502 16.4191 24.0232 17.5751C22.8912 18.8131 21.6787 19.9089 20.4596 21.0108C19.6379 21.7534 18.8133 22.4988 18.0083 23.2921C17.3072 23.8617 16.5791 25.0073 17.3642 25.8051C19.1724 27.0709 21.0089 28.3061 22.8443 29.5406C23.4416 29.9422 24.0388 30.3439 24.6348 30.7466C25.645 31.5531 27.2238 30.9007 27.4458 29.6404C27.5446 29.0607 27.6437 28.481 27.7429 27.9012C28.2909 24.6973 28.8391 21.4923 29.3233 18.2779C29.3892 17.7737 29.4637 17.2695 29.5384 16.7651C29.7193 15.5425 29.9005 14.3184 29.9571 13.0892C29.8113 11.8626 28.3239 12.1323 27.4962 12.4082C23.2419 14.027 19.0301 15.7658 14.8349 17.5353C14.3597 17.7458 13.8779 17.9562 13.3929 18.1679Z"
        fill="#C4C4C4"
      />
    )}
    {type === SocialMediaType.Twitter && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM30.7542 13.1297C30.7563 13.1288 30.7584 13.1279 30.7604 13.127V13.1203C30.7584 13.1235 30.7563 13.1266 30.7542 13.1297ZM30.7542 13.1297C29.9407 13.4946 29.0785 13.7345 28.1959 13.8416C29.1274 13.2736 29.8241 12.3796 30.1557 11.3265C29.2804 11.858 28.3221 12.2327 27.3226 12.4345C26.7103 11.7706 25.9166 11.3093 25.0441 11.1101C24.1716 10.9109 23.2605 10.9831 22.4287 11.3173C21.5969 11.6515 20.8827 12.2323 20.3785 12.9846C19.8744 13.7368 19.6034 14.6259 19.6007 15.5368C19.5998 15.8852 19.6389 16.2325 19.7171 16.5717C17.9427 16.4819 16.2067 16.0127 14.6219 15.1948C13.0371 14.3768 11.6389 13.2284 10.5183 11.824C9.94784 12.825 9.77337 14.0098 10.0304 15.1373C10.2874 16.2647 10.9566 17.25 11.9017 17.8924C11.1924 17.8697 10.4988 17.6744 9.87877 17.3229V17.3794C9.87894 18.4292 10.2356 19.4466 10.8881 20.259C11.5407 21.0715 12.4491 21.6289 13.4591 21.8369C12.8018 22.0181 12.1125 22.0442 11.4438 21.9133C11.729 22.8164 12.2839 23.6062 13.0311 24.1723C13.7783 24.7385 14.6804 25.0527 15.6114 25.0711C14.0296 26.3364 12.0759 27.0225 10.0647 27.0189C9.70896 27.018 9.35349 26.9969 9 26.9558C11.041 28.2924 13.4167 29.0021 15.8431 29C24.0522 29 28.5407 22.0717 28.5407 16.0631C28.5407 15.8648 28.5407 15.6698 28.5276 15.4748C29.4009 14.8344 30.155 14.0402 30.7542 13.1297Z"
        fill="#C4C4C4"
      />
    )}
  </svg>
);
