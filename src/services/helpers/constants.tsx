class Constants {
  static ramdomImage = (username) => {
    return `https://ui-avatars.com/api/?name=${username}&background=random&size=512`;
  };

  // export const defaultAvatar = (username) => {
  //   return `https://api.multiavatar.com/${username}.svg`;
  // };

  static defaultAvatar = (gender = "male") => {
    if (typeof gender !== "string") {
      return images?.defaultMaleAvatar;
    }

    const lowerCaseGender = gender?.toLowerCase();

    if (lowerCaseGender === "male") {
      return images?.defaultMaleAvatar;
    } else if (lowerCaseGender === "female") {
      return images?.defaultFemaleAvatar;
    } else {
      return images?.defaultMaleAvatar;
    }
  };

  static defaultProfile = (gender = "male") => {
    if (typeof gender !== "string") {
      return images?.defaultMaleAvatar;
    }

    const lowerCaseGender = gender?.toLowerCase();

    if (lowerCaseGender === "male") {
      return images?.defaultMaleAvatar;
    } else if (lowerCaseGender === "female") {
      return images?.defaultFemaleAvatar;
    } else {
      return images?.defaultMaleAvatar;
    }
  };

  static defaultThumbnailImage = (content = "No Image") => {
    return `https://placehold.co/400x400?text=${content}`;
  };

  static header = {
    "Content-Type": "application/json",
  };
}

export default Constants;
