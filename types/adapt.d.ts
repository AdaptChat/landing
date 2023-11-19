namespace adapt {
  /**
   * Represents a user account.
   *
   * A lot of information is stored in the user's flags, including whether the user is a bot
   * account.
   */
  export interface User {
    /**
     * The snowflake ID of the user.
     */
    id: number;
    /**
     * The username of the user.
     */
    username: string;
    /**
     * The display name of the user. This is `None` if the user has no display name.
     */
    display_name: string | null;
    /**
     * The URL of the user's avatar. This is `None` if the user has no avatar.
     */
    avatar?: string;
    /**
     * The URL of the user's banner. This is `None` if the user has no banner.
     */
    banner?: string;
    /**
     * The user's bio. This is `None` if the user has no bio.
     */
    bio?: string;
    /**
     * A bitmask of extra information associated with this user.
     */
    flags: number;
  }

  /**
   * Represents the type along with type-specific information of a guild channel.
   */
  export type GuildChannelInfo = {
    /**
     * The type of the channel.
     */
    type: 'text' | 'announcement',
    /**
     * The topic of the channel, if any.
     */
    topic?: string,
    /**
     * Whether the channel is NSFW.
     */
    nsfw: boolean,
    /**
     * Whether the channel is locked. Only people with the `MANAGE_CHANNELS` permission can
     * send messages in locked channels.
     */
    locked: boolean,
    /**
     * The slowmode delay of the channel, in **milliseconds**. This should be a value between
     * `0` and `86_400_000` (24 hours). `0` indicates the absence of slowmode.
     */
    slowmode: number,
  } | {
    /**
     * The type of the channel.
     */
    type: 'voice',
    /**
     * The user limit of the channel. This should be a value between `0` and `500`. `0` indicates
     * the absence of a user limit.
     */
    user_limit: number,
  } | {
    /**
     * The type of the channel.
     */
    type: 'category',
  }

  /**
   * Represents a channel in a guild.
   */
  export type GuildChannel = GuildChannelInfo & {
    /**
     * The ID of the channel.
     */
    id: number,
    /**
     * The ID of the guild that this channel is in.
     */
    guild_id: number,
    /**
     * The name of the channel.
     */
    name: string,
    /**
     * The position of the channel in the channel list. A lower value means appearing "higher" in
     * the UI, basically think of this as a 0-indexed listing of the channels from top-to-bottom.
     *
     * Positions are scoped per category, and categories have their own positions. Channels that
     * lack a category will be shown above all categories. This is because no channels can be
     * displayed in between or after categories - in the UI all non-category channels are displayed
     * above any other category channels.
     */
    position: number,
    /**
     * The permission overwrites for this channel.
     */
    permission_overwrites: PermissionOverwrite[],
    /**
     * The ID of the parent category of the channel. This is `undefined` if the channel is not in a
     * category.
     */
    parent_id?: number,
  }

  /**
   * Represents a permission overwrite.
   */
  export interface PermissionOverwrite {
    /**
     * The ID of the role or user that this overwrite applies to. The model type can be extracted from
     * the ID.
     */
    id: number;
    /**
     * Allowed permissions.
     */
    allow: bigint;
    /**
     * Denied permissions.
     */
    deny: bigint;
  }

  /**
   * Represents a guild with partial information, sometimes referred to as a server.
   */
  export interface PartialGuild {
    /**
     * The snowflake ID of the guild.
     */
    id: number;
    /**
     * The name of the guild.
     */
    name: string;
    /**
     * The description of the guild.
     */
    description?: string;
    /**
     * The URL of the icon of the guild.
     */
    icon?: string;
    /**
     * The URL of the banner of the guild.
     */
    banner?: string;
    /**
     * The ID of the owner of the guild.
     */
    owner_id: number;
    /**
     * Extra information about the guild represented through bitflags.
     */
    flags: number;
    /**
     * The amount of members in the guild. This could be `None` at times. For partial guilds, the
     * `online` field of this will also be `None`.
     */
    member_count?: {
      /**
       * The total number of members in the guild.
       */
      total: number;
      /**
       * The number of members that are online. If this was part of a partial guild object, then
       * this will be `None`.
       */
      online?: number;
    };
    /**
     * The vanity URL code of the guild. This solely includes the code, not the full URL.
     * This is `None` if the guild does not have a vanity URL.
     *
     * Guilds have the ability to set vanity URLs once they surpass 100 non-bot members *and* have
     * their visibility set to public. The vanity URL code can be between 3 and 32 characters long.
     */
    vanity_url?: string;
  }

  /**
   * Represents a guild with all information.
   */
  export interface Guild extends PartialGuild {
    /**
     * A list of resolved members in the guild.
     */
    members?: Member[];
    /**
     * A list of resolved roles in the guild.
     */
    roles?: any // TODO Role[];
    /**
     * A list of resolved channels in the guild.
     */
    channels?: GuildChannel[]
  }

  type MaybePartialUser = User | {
    /**
     * The snowflake ID of the user.
     */
    id: number;
  }

  /**
   * Represents a member of a guild. Members are users that are associated with a guild.
   */
  export type Member = MaybePartialUser & {
    /**
     * The ID of the guild this member is in.
     */
    guild_id: number;
    /**
     * The nickname of the member. `None` if the member has no nickname.
     */
    nick?: string;
    /**
     * A list of IDs of the roles that the member has. This could be `None` in some cases.
     */
    roles?: number[];
    /**
     * The time that the member joined the guild.
     */
    joined_at: string;
  }

  /**
   * Represents an invitation to a guild. All invites are immutable by design.
   */
  export interface Invite {
    /**
     * The code of the invite.
     */
    code: string;
    /**
     * The ID of the user that created this invite.
     */
    inviter_id: number;
    /**
     * Partial guild information about the guild this invite leads to. This is `None` when this is
     * already fetched from a guild.
     */
    guild?: PartialGuild;
    /**
     * The ID of the guild this invite leads to.
     */
    guild_id: number;
    /**
     * A timestamp representing when this invite was created.
     */
    created_at: string;
    /**
     * How many times this invite has been used.
     */
    uses: number;
    /**
     * How many times this invite can be used. `0` if unlimited.
     */
    max_uses: number;
    /**
     * How long this invite is valid for, in seconds. `0` if this invite never expires. This
     * counts from the time the invite was created (see `created_at`).
     */
    max_age: number;
  }

  /**
   * A role in a guild.
   */
  export interface Role {
    /**
     * The snowflake ID of the role.
     */
    id: number;
    /**
     * The ID of the guild this role belongs to.
     */
    guild_id: number;
    /**
     * The name of the role.
     *
     */
    name: string;
    /**
     * The color of the role. This is an integer between 0 and 16777215, or `None` if the role
     * has no color (in which case it inherits the color).
     */
    color?: number;
    /**
     * The permissions users with this role have.
     */
    permissions: {
      /**
       * Allowed permissions.
       */
      allow: bigint;
      /**
       * Denied permissions.
       */
      deny: bigint;
    };
    /**
     * The position of this role in the role hierarchy. The lower the number, the lower the role.
     * The default role always has a position of 0.
     */
    position: number;
    /**
     * A bitmask of flags representing extra metadata about the role.
     */
    flags: number;
  }
}

export default adapt