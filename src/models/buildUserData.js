const BuildUserInfo = (data, provider) => {
    const user = {
        name: '',
        fisheryName: '',
        phone: '',
        email: '',
        picture: '',
        providerUid: '',
        provider: '' 
    }

    if (provider === 'GOOGLE') {
        user.name = data.user.name;
        user.fisheryName = '';
        user.phone = '',
        user.email = data.user.email;
        user.picture = data.user.photo;
        user.providerUid = data.user.id;
        user.provider = provider;
    } else if (provider === 'FACEBOOK') {
        user.name = data.name;
        user.fisheryName = '';
        user.phone = '',
        user.email = data.email;
        user.picture = data.picture.data.url;
        user.providerUid = data.id;
        user.provider = provider;
    } else if (provider === 'PHONE') {
        user.name = data.name;
        user.fisheryName = data.fisheryName;
        user.phone = data.phoneNumber
        user.email = data.email;
        user.picture = '';
        user.providerUid = data.providerUid;
        user.provider = provider;
    }

    return user;

}

export default BuildUserInfo;