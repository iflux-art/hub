/**
 * 用户信息
 */
export interface UserInfo {
  /** 用户ID */
  id: string;
  /** 用户名 */
  username?: string | null;
  /** 名字 */
  firstName?: string | null;
  /** 姓氏 */
  lastName?: string | null;
  /** 头像URL */
  imageUrl?: string | null;
  /** 主要邮箱地址 */
  primaryEmailAddress?: {
    /** 邮箱地址 */
    emailAddress?: string | null;
  } | null;
  /** 创建时间 */
  createdAt?: Date | null;
  /** 主要邮箱地址ID */
  primaryEmailAddressId?: string | null;
  /** 邮箱地址列表 */
  emailAddresses?: {
    /** 邮箱ID */
    id: string;
    /** 邮箱地址 */
    emailAddress: string;
    /** 验证信息 */
    verification?: {
      /** 验证状态 */
      status: string | null;
    } | null;
  }[];
  /** 外部账户列表 */
  externalAccounts?: {
    /** 账户ID */
    id: string;
    /** 提供商 */
    provider: string;
    /** 邮箱地址 */
    emailAddress?: string | null;
  }[];
}

/**
 * 用户信息卡片 Props
 */
export interface UserInfoCardProps {
  /** 用户信息 */
  user: UserInfo;
  /** 用户全名 */
  fullName: string;
  /** 用户姓名首字母 */
  initials: string;
}

/**
 * 账户详情卡片 Props
 */
export interface AccountDetailsCardProps {
  /** 用户信息 */
  user: UserInfo;
}
