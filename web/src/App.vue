<script>
import "@/assets/style/global.scss";
import Input from "@/components/Input.vue";
import { reactive, ref } from "vue";

const API_URL = "http://localhost:3000/registration";
const TOTAL_STEPS = 4;

const StepTitles = [
  "Seja bem-vindo(a)",
  "Pessoa Física",
  "Senha de acesso",
  "Revise suas informações",
];

const initialForm = {
  email: "",
  accountType: "",
  name: "",
  cpf: "",
  birthDate: "",
  phoneNumber: "",
  password: "",
  socialName: "",
  cnpj: "",
  initialDate: "",
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isButtonDisabled = (step, form) => {
  const validateByStep = {
    1: form.accountType && isValidEmail(form.email),
    2: form.name && form.cpf && form.birthDate && form.phoneNumber,
    3: form.password,
    4: true,
  };

  const validatePJ =
    step === 2 &&
    form.accountType === "PJ" &&
    form.socialName &&
    form.cnpj &&
    form.initialDate &&
    form.phoneNumber;

  return !(validateByStep[step] || validatePJ);
};

export default {
  components: { Input },
  setup() {
    const step = ref(1);
    const title = ref(StepTitles[0]);
    const form = reactive({ ...initialForm });

    const handleTitleByStep = () => {
      title.value =
        step.value === 2 && form.accountType === "PJ"
          ? "Pessoa Jurídica"
          : StepTitles[step.value - 1];
    };

    const handleSignUp = async () => {
      try {
        const { status } = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(form),
        });

        if (status === 201) {
          handleInitialStep();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleNextStep = () => {
      if (step.value === TOTAL_STEPS) return handleSignUp();
      step.value += 1;
      handleTitleByStep();
    };

    const handleBackStep = () => {
      step.value -= 1;
      handleTitleByStep();
    };

    const handleInitialStep = () => {
      step.value = 1;
      handleTitleByStep();
      Object.assign(form, initialForm);
    };

    return {
      form,
      step,
      title,
      handleBackStep,
      handleNextStep,
      handleInitialStep,
      isButtonDisabled: () => isButtonDisabled(step.value, form),
    };
  },
};
</script>
<template>
  <div class="container">
    <div class="card">
      <div>
        <p>
          Etapa <span class="primary-color">{{ step }}</span> de 4
        </p>
        <h2>{{ title }}</h2>
      </div>
      <div class="content" v-if="step === 1">
        <Input label="Endereço de e-mail" v-model="form.email" />
        <div>
          <label for="PF">
            <input type="radio" id="PF" value="PF" v-model="form.accountType" />
            Pessoa física
          </label>
          <label>
            <input type="radio" id="PJ" value="PJ" v-model="form.accountType" />
            Pessoa jurídica
          </label>
        </div>
      </div>
      <div class="content" v-if="step === 2 && form.accountType === 'PF'">
        <Input label="Nome" v-model="form.name" />
        <Input label="CPF" v-model="form.cpf" maxlength="11" />
        <Input
          label="Data de nascimento"
          type="date"
          v-model="form.birthDate"
        />
        <Input label="Telefone" v-model="form.phoneNumber" />
      </div>
      <div class="content" v-if="step === 2 && form.accountType === 'PJ'">
        <Input label="Razão social" v-model="form.socialName" />
        <Input label="CNPJ" v-model="form.cnpj" maxlength="14" />
        <Input
          label="Data de abertura"
          type="date"
          v-model="form.initialDate"
        />
        <Input label="Telefone" v-model="form.phoneNumber" />
      </div>
      <div class="content" v-if="step === 3">
        <Input label="Sua senha" v-model="form.password" type="password" />
      </div>
      <div class="content" v-if="step === 4">
        <Input label="Endereço de e-mail" v-model="form.email" />

        <div v-if="form.accountType === 'PJ'">
          <Input label="Razão social" v-model="form.socialName" />
          <Input label="CNPJ" v-model="form.cnpj" />
          <Input
            label="Data de abertura"
            type="date"
            v-model="form.initialDate"
          />
          <Input label="Telefone" v-model="form.phoneNumber" />
        </div>
        <div v-else>
          <Input label="Nome" v-model="form.name" />
          <Input label="CPF" v-model="form.cpf" />
          <Input
            label="Data de nascimento"
            type="date"
            v-model="form.birthDate"
          />
          <Input label="Telefone" v-model="form.phoneNumber" />
        </div>
        <Input label="Senha" v-model="form.password" />
      </div>
      <div class="actions">
        <button
          class="button outline w-100"
          @click="handleBackStep"
          v-if="step != 1"
        >
          Voltar
        </button>
        <button
          class="button w-100"
          :disabled="isButtonDisabled()"
          @click="handleNextStep"
        >
          {{ step !== 4 ? "Continuar" : "Cadastrar" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.card {
  width: 400px;
}
.content {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}

.actions {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
</style>
